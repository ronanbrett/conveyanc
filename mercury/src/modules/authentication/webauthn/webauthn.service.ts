import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  generateAssertionOptions,
  generateAttestationOptions,
  verifyAssertionResponse,
  verifyAttestationResponse,
} from '@simplewebauthn/server';
import { VerifiedAttestation } from '@simplewebauthn/server/dist/attestation/verifyAttestationResponse';
import {
  AssertionCredentialJSON,
  AttestationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import { get } from 'config';
import { Redis } from 'ioredis';
import { Logger } from 'nestjs-pino';
import { WebauthnConfig } from '../../../core/config/webauth.config';
import { REDIS_CLIENT } from '../../../core/connections/redis.connection';
import { User } from '../../identification/identification.model';
import { IdentificationService } from '../../identification/identification.service';

const loggedInUserId = 'internalUserId';

@Injectable()
export class WebauthnService {
  readonly config: WebauthnConfig = get('Webauthn');

  db = {
    [loggedInUserId]: {
      id: loggedInUserId,
      username: `user@${this.config.rpID}`,
      devices: [
        /**
         * {
         *   credentialID: string,
         *   publicKey: string,
         *   counter: number,
         * }
         */
      ],
      /**
       * A simple way of storing a user's current challenge being signed by attestation or assertion.
       * It should be expired after `timeout` milliseconds (optional argument for `generate` methods,
       * defaults to 60000ms)
       */
      currentChallenge: undefined,
    },
  };

  constructor(
    @Inject(REDIS_CLIENT) private client: Redis,
    private identificationService: IdentificationService,
    private logger: Logger,
  ) {}

  async registerUser(username: string): Promise<User> {
    const doesUserExist = await this.identificationService.findOne(username);

    if (doesUserExist) {
      throw new BadRequestException('This user already exists.');
    }

    return this.identificationService.save({ username });
  }

  async register(id: string): Promise<PublicKeyCredentialCreationOptionsJSON> {
    let user;
    try {
      user = await this.identificationService.findOne(id);
    } catch (err) {
      throw new BadRequestException('Username doesnt exist');
    }

    const { username, devices } = user;

    const options = generateAttestationOptions({
      serviceName: this.config.serviceName,
      rpID: this.config.rpID,
      userID: loggedInUserId,
      userName: username,
      timeout: 60000,
      attestationType: 'direct',
      /**
       * Passing in a user's list of already-registered authenticator IDs here prevents users from
       * registering the same device multiple times. The authenticator will simply throw an error in
       * the browser if it's asked to perform an attestation when one of these ID's already resides
       * on it.
       */
      excludedCredentialIDs: devices.map(dev => dev.credentialID),
      /**
       * The optional authenticatorSelection property allows for specifying more constraints around
       * the types of authenticators that users to can use for attestation
       */
      authenticatorSelection: {
        userVerification: 'preferred',
        requireResidentKey: false,
      },
    });

    await this.client.set(`CHALLENGE_${username}`, options.challenge);
    await this.client.expire(`CHALLENGE_${username}`, 60000);

    return options;
  }

  async verifyRegistration(
    credential: AttestationCredentialJSON,
    username: string,
  ): Promise<{ verified: boolean }> {
    const user = await this.identificationService.findOne(username);
    const expectedChallenge = await this.client.get(`CHALLENGE_${username}`);

    let verification;
    try {
      verification = await verifyAttestationResponse({
        credential: credential,
        expectedChallenge,
        expectedOrigin: this.config.origin,
        expectedRPID: this.config.rpID,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }

    const { verified, authenticatorInfo } = verification as VerifiedAttestation;

    if (verified) {
      const {
        base64PublicKey,
        base64CredentialID,
        counter,
      } = authenticatorInfo;

      const existingDevice = user.devices.find(
        device => device.credentialID === base64CredentialID,
      );

      if (!existingDevice) {
        /**
         * Add the returned device to the user's list of devices
         */
        user.devices.push({
          publicKey: base64PublicKey,
          credentialID: base64CredentialID,
          counter,
        });

        await user.save();
      }
    }

    return { verified };
  }

  async login(
    username: string,
  ): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const user = await this.identificationService.findOne(username);
    const options = generateAssertionOptions({
      timeout: 60000,
      allowedCredentialIDs: user.devices.map(data => data.credentialID),
      /**
       * This optional value controls whether or not the authenticator needs be able to uniquely
       * identify the user interacting with it (via built-in PIN pad, fingerprint scanner, etc...)
       */
      userVerification: 'preferred',
    });

    await this.client.set(`CHALLENGE_${username}`, options.challenge);
    await this.client.expire(`CHALLENGE_${username}`, 60000);

    return options;
  }

  async verifyLogin(
    credential: AssertionCredentialJSON,
    username: string,
  ): Promise<{ verified: boolean; user: any }> {
    const user = await this.identificationService.findOne(username);
    const expectedChallenge = await this.client.get(`CHALLENGE_${username}`);

    let dbAuthenticator;
    // "Query the DB" here for an authenticator matching `credentialID`
    for (const dev of user.devices) {
      if (dev.credentialID === credential.id) {
        dbAuthenticator = dev;
        break;
      }
    }

    if (!dbAuthenticator) {
      throw new Error(`could not find authenticator matching ${credential.id}`);
    }

    let verification;
    try {
      verification = verifyAssertionResponse({
        credential,
        expectedChallenge,
        expectedOrigin: this.config.origin,
        expectedRPID: this.config.rpID,
        authenticator: dbAuthenticator,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }

    const { verified, authenticatorInfo } = verification;

    if (verified) {
      // Update the authenticator's counter in the DB to the newest count in the assertion
      dbAuthenticator.counter = authenticatorInfo.counter;
    }

    return { verified, user: { username: user.username } };
  }
}
