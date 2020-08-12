import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { mocked } from 'ts-jest/utils';
import { AuthenticationController } from './authentication.controller';
import { WebauthnService } from './webauthn/webauthn.service';

jest.mock('./webauthn/webauthn.service');

describe('Authentication Controller', () => {
  let controller: AuthenticationController;
  let service: WebauthnService;
  const mockedWebauthn = mocked(WebauthnService, true);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthenticationController],
      providers: [WebauthnService],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    service = module.get(WebauthnService);
    mockedWebauthn.mockClear();
  });

  it('should work', () => {
    expect(controller).toBeDefined();
  });

  describe('Registering with WebAuthn', () => {
    it('the user should be able to retrieve an assertion option challenge', async () => {
      spyOn(service, 'register').and.returnValue({
        challenge: 'Al-Q4l9IEiBAGIMgsT4aTBPS8831qzfrtDfh2yrgFV8',
      });

      const response = await controller.register({
        session: {
          user: {
            username: 'jacob',
          },
        },
      } as any);

      expect(service.register).toHaveBeenCalledWith('jacob');

      expect(response).toEqual({
        challenge: 'Al-Q4l9IEiBAGIMgsT4aTBPS8831qzfrtDfh2yrgFV8',
      });
    });

    it('the user should be able to post an assertion challenge', async () => {
      spyOn(service, 'verifyRegistration').and.returnValue({
        verified: true,
      });

      const response = await controller.verifyRegistration({
        body: { test: 'test' },
        session: {
          user: {
            username: 'jacob',
          },
        },
      } as any);

      expect(response).toEqual({
        verified: true,
      });
    });
  });

  describe('Logging In with WebAuthn', () => {
    it('it should be able to retrieve the attestation options', async () => {
      spyOn(service, 'login').and.returnValue({
        challenge: 'Al-Q4l9IEiBAGIMgsT4aTBPS8831qzfrtDfh2yrgFV8',
      });

      const response = await controller.login('jacob');

      expect(response).toEqual({
        challenge: 'Al-Q4l9IEiBAGIMgsT4aTBPS8831qzfrtDfh2yrgFV8',
      });
    });

    it('it should be able to verify the login and set the session', async () => {
      spyOn(service, 'verifyLogin').and.returnValue({
        verified: true,
      });

      const req: Partial<Request> = {
        body: { test: 'test' },
        session: <any>{
          isLoggedIn: false,
          user: {
            username: 'test',
          },
        },
      };

      const response = await controller.verifyLogin(req as Request);
      expect(response).toEqual({
        verified: true,
      });

      expect(req.session.isLoggedIn).toBeTruthy();
    });
  });
});
