import { Test, TestingModule } from '@nestjs/testing';
import { REDIS_CLIENT } from '@utils/redis-connection';
import * as redis from 'ioredis';
import { Logger } from 'nestjs-pino';
import { IdentificationService } from '../../identification/identification.service';
import { WebauthnService } from './webauthn.service';

jest.mock('nestjs-pino');
jest.mock('ioredis', () => ({
  set: () => true,
  expire: () => true,
}));
jest.mock('../../identification/identification.service');

const REGISTER_GET_RESPONSE_STUB = {
  challenge: '-ietdjWzdzJcv8OpcYdmlc3Ej3FfE-Lh1mVxEVOKhCM',
  rp: { name: 'mercury', id: 'localhost' },
  user: {
    id: 'internalUserId',
    name: 'user@localhost',
    displayName: 'user@localhost',
  },
  pubKeyCredParams: [
    { alg: -7, type: 'public-key' },
    { alg: -8, type: 'public-key' },
    { alg: -36, type: 'public-key' },
    { alg: -37, type: 'public-key' },
    { alg: -38, type: 'public-key' },
    { alg: -39, type: 'public-key' },
    { alg: -257, type: 'public-key' },
    { alg: -258, type: 'public-key' },
    { alg: -259, type: 'public-key' },
  ],
  timeout: 60000,
  attestation: 'direct',
  excludeCredentials: [],
  authenticatorSelection: {
    userVerification: 'preferred',
    requireResidentKey: false,
  },
};
const REGISTER_POST_REQUEST_PAYLOAD = {
  id:
    'AUrJke8fXQVoffJ723_j8hXaqCbPHTesOL8FVE5Zb532ag_8xqwS49qxTGw8yLRQb6AWtj94uCwWUYPXv58Q48GiBqTj6lHo35UsQA',
  rawId:
    'AUrJke8fXQVoffJ723_j8hXaqCbPHTesOL8FVE5Zb532ag_8xqwS49qxTGw8yLRQb6AWtj94uCwWUYPXv58Q48GiBqTj6lHo35UsQA',
  response: {
    attestationObject:
      'o2NmbXRmcGFja2VkZ2F0dFN0bXSiY2FsZyZjc2lnWEgwRgIhAMDz3MqNcbpObIdXDJj0oNZ8ctUXDwd7uTjle48Xbl4hAiEA653gn_RN01kx4pouiKwLk5COSu2FW93dUR4f4ZIbMLdoYXV0aERhdGFY0EmWDeWIDoxodDQXD2R2YFuP5K65ooYyx5lc87qDHZdjRV80Ig-tzgACNbzGCmSLCyXx8FUDAEwBSsmR7x9dBWh98nvbf-PyFdqoJs8dN6w4vwVUTllvnfZqD_zGrBLj2rFMbDzItFBvoBa2P3i4LBZRg9e_nxDjwaIGpOPqUejflSxApQECAyYgASFYIJU0lgL2Xla_AazDUA3i3SOZg54E3jMOkJogpmPxc14eIlggntfM4NkDBtLpYUVE_4LU22F0I2IAdPPo8XrziziqdG8',
    clientDataJSON:
      'eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiLWlldGRqV3pkekpjdjhPcGNZZG1sYzNFajNGZkUtTGgxbVZ4RVZPS2hDTSIsIm9yaWdpbiI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9',
  },
  type: 'public-key',
};
const LOGIN_GET_REQUEST_PAYLOAD = {
  challenge: 'jfkIUKsSz-pi4-XKW91K8TBv4IrYIIUxUC0zS7dWEUI',
  allowCredentials: [
    {
      id:
        'AUrJke8fXQVoffJ723_j8hXaqCbPHTesOL8FVE5Zb532ag_8xqwS49qxTGw8yLRQb6AWtj94uCwWUYPXv58Q48GiBqTj6lHo35UsQA',
      type: 'public-key',
      transports: ['usb', 'ble', 'nfc', 'internal'],
    },
  ],
  timeout: 60000,
  userVerification: 'preferred',
};
const LOGIN_POST_REQUEST_PAYLOAD = {
  id:
    'AUrJke8fXQVoffJ723_j8hXaqCbPHTesOL8FVE5Zb532ag_8xqwS49qxTGw8yLRQb6AWtj94uCwWUYPXv58Q48GiBqTj6lHo35UsQA',
  rawId:
    'AUrJke8fXQVoffJ723_j8hXaqCbPHTesOL8FVE5Zb532ag_8xqwS49qxTGw8yLRQb6AWtj94uCwWUYPXv58Q48GiBqTj6lHo35UsQA',
  response: {
    authenticatorData: 'SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MFXzQiFA',
    clientDataJSON:
      'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiamZrSVVLc1N6LXBpNC1YS1c5MUs4VEJ2NElyWUlJVXhVQzB6UzdkV0VVSSIsIm9yaWdpbiI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9',
    signature:
      'MEQCIFbdRyS9FQ4WZFAANEnDQDDJJ36gDK2PN-4Y0DMC60ELAiB2gRfB-2Zj6anxUa70gCIwRaOhKMMKf0n6n-pK1PfPAg',
    userHandle: 'aW50ZXJuYWxVc2VySWQ',
  },
  type: 'public-key',
};

describe('WebauthnService', () => {
  let service: WebauthnService;
  let identityService: IdentificationService;
  let redisClient: redis.Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentificationService,
        WebauthnService,
        Logger,
        {
          provide: REDIS_CLIENT,
          useValue: {
            set: () => true,
            expire: () => true,
            get: () => '-ietdjWzdzJcv8OpcYdmlc3Ej3FfE-Lh1mVxEVOKhCM',
          },
        },
      ],
    }).compile();

    service = module.get<WebauthnService>(WebauthnService);
    identityService = module.get<IdentificationService>(IdentificationService);
    redisClient = module.get<redis.Redis>(REDIS_CLIENT);
  });

  describe('Setup', () => {
    it('should have a config', () => {
      expect(service.config).toEqual({
        origin: 'https://localhost:5000',
        rpID: 'localhost',
        serviceName: 'mercury',
      });
    });

    describe('Assertion', () => {
      it('should be able to retrieve assertion options to start registration', async () => {
        jest
          .spyOn(identityService, 'findOne')
          .mockResolvedValue({ username: 'jacobmarley', devices: [] } as any);
        const options = await service.register('jacobmarley');

        expect(options.rp).toEqual(REGISTER_GET_RESPONSE_STUB.rp);
        expect(options.attestation).toEqual(
          REGISTER_GET_RESPONSE_STUB.attestation,
        );
        expect(options.authenticatorSelection).toEqual(
          REGISTER_GET_RESPONSE_STUB.authenticatorSelection,
        );
        expect(options.pubKeyCredParams).toEqual(
          REGISTER_GET_RESPONSE_STUB.pubKeyCredParams,
        );
        expect(options.timeout).toEqual(REGISTER_GET_RESPONSE_STUB.timeout);
      });

      it('should be able to verify registration', async () => {
        jest.spyOn(identityService, 'findOne').mockResolvedValue({
          username: 'jacobmarley',
          devices: [],
          save: () => true,
        } as any);

        const verify = await service.verifyRegistration(
          REGISTER_POST_REQUEST_PAYLOAD,
          'jacobmarley',
        );

        expect(verify).toEqual({ verified: true });
      });

      it('should fail verification if challenge is wrong dont match', async () => {
        await expect(
          service.verifyRegistration(
            REGISTER_POST_REQUEST_PAYLOAD,
            'jacobmarley',
          ),
        ).rejects.toThrow();
      });
    });
  });

  describe('Attestation', () => {
    it('should be able to retrieve attestation options', async () => {
      jest.spyOn(identityService, 'findOne').mockResolvedValue({
        username: 'jacobmarley',
        devices: [],
        save: () => true,
      } as any);

      const options = await service.login('jacobmarley');

      expect(options.userVerification).toEqual(
        LOGIN_GET_REQUEST_PAYLOAD.userVerification,
      );
    });

    it('should be able to verify login', async () => {
      jest
        .spyOn(redisClient, 'get')
        .mockResolvedValue('jfkIUKsSz-pi4-XKW91K8TBv4IrYIIUxUC0zS7dWEUI');

      jest.spyOn(identityService, 'findOne').mockResolvedValue({
        username: 'jacobmarley',
        devices: [
          {
            publicKey:
              'BJU0lgL2Xla_AazDUA3i3SOZg54E3jMOkJogpmPxc14entfM4NkDBtLpYUVE_4LU22F0I2IAdPPo8XrziziqdG8',
            credentialID:
              'AUrJke8fXQVoffJ723_j8hXaqCbPHTesOL8FVE5Zb532ag_8xqwS49qxTGw8yLRQb6AWtj94uCwWUYPXv58Q48GiBqTj6lHo35UsQA',
            counter: 1597252111,
          },
        ],
        save: () => true,
      } as any);

      const verify = await service.verifyLogin(
        LOGIN_POST_REQUEST_PAYLOAD,
        'jacobmarley',
      );

      expect(verify).toEqual({
        verified: true,
        user: { username: 'jacobmarley' },
      });
    });

    it('should fail if it cant find a users matching authentication token', async () => {
      jest
        .spyOn(redisClient, 'get')
        .mockResolvedValue('jfkIUKsSz-pi4-XKW91K8TBv4IrYIIUxUC0zS7dWEUI');

      jest.spyOn(identityService, 'findOne').mockResolvedValue({
        username: 'jacobmarley',
        devices: [],
        save: () => true,
      } as any);

      await expect(
        service.verifyLogin(LOGIN_POST_REQUEST_PAYLOAD, 'jacobmarley'),
      ).rejects.toThrowError(
        'could not find authenticator matching AUrJke8fXQVoffJ723_j8hXaqCbPHTesOL8FVE5Zb532ag_8xqwS49qxTGw8yLRQb6AWtj94uCwWUYPXv58Q48GiBqTj6lHo35UsQA',
      );
    });
  });
});
