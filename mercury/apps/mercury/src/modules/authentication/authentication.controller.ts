import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import {
  AttestationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import { Request } from 'express';
import { User } from '../identification/identification.model';
import { WebauthnService } from './webauthn/webauthn.service';
import {
  cognitoClient,
  generateCognitoToken,
} from '../../core/aws/cognito-aws.core';
import { Logger } from 'nestjs-pino';

/**
 * TODO
 * Abstract the methods of authentications out into strategies instead of locking it to Webauthn
 * - Google
 * - Facebok
 */

@Controller('auth')
export class AuthenticationController {
  constructor(
    private logger: Logger,
    private readonly webauthnService: WebauthnService,
  ) {}

  @Get('register/user')
  async registerUser(
    @Req() req: Request,
    @Query('username') username: string,
  ): Promise<User> {
    req.session.user = { username };
    return await this.webauthnService.registerUser(username);
  }

  // WebAuthn
  @Get('register')
  async register(
    @Req() req: Request,
  ): Promise<PublicKeyCredentialCreationOptionsJSON> {
    const username = req.session.user.username;
    return await this.webauthnService.register(username);
  }

  @Post('register')
  async verifyRegistration(
    @Req() req: Request,
  ): Promise<{ verified: boolean }> {
    const credentials = req.body;
    const username = req.session.user.username;

    return await this.webauthnService.verifyRegistration(
      credentials as AttestationCredentialJSON,
      username,
    );
  }

  @Get('login')
  async login(
    @Req() req: Request,
    @Query('username') username: string,
  ): Promise<PublicKeyCredentialRequestOptionsJSON> {
    req.session.user = { username };

    return this.webauthnService.login(username);
  }

  @Post('login')
  async verifyLogin(
    @Req() req: Request,
  ): Promise<{ verified: boolean; user: any }> {
    const credential = req.body;
    const username = req.session.user.username;

    const { verified, user } = await this.webauthnService.verifyLogin(
      credential,
      username,
    );

    if (verified) {
      req.session.isLoggedIn = true;
      req.session.credId = credential.id;
      req.session.user = user;
    }

    try {
      const awsToken = await cognitoClient.getOpenIdTokenForDeveloperIdentity(
        generateCognitoToken(username, credential.id),
      );
      user.aws = awsToken;
      user.aws.expiresIn = 86400;
    } catch (err) {
      this.logger.error(err);
    }

    return { verified, user };
  }

  @Get('logout')
  async logout(@Req() req: Request): Promise<boolean> {
    req.session.destroy(err => {
      this.logger.error(err);
    });
    return true;
  }
}
