import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
  AttestationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import { Request, Response } from 'express';
import { WebauthnService } from './webauthn/webauthn.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly webauthnService: WebauthnService) {}
  // WebAuthn
  @Get('register')
  register(): PublicKeyCredentialCreationOptionsJSON {
    return this.webauthnService.register();
  }

  @Post('register')
  async verifyRegistration(
    @Req() res: Request,
  ): Promise<{ verified: boolean }> {
    const credentials = res.body;

    return await this.webauthnService.verifyRegistration(
      credentials as AttestationCredentialJSON,
    );
  }

  @Get('login')
  login(): PublicKeyCredentialRequestOptionsJSON {
    return this.webauthnService.login();
  }

  @Post('login')
  async verifyLogin(@Req() req: Request): Promise<{ verified: boolean }> {
    const credential = req.body;

    const { verified } = await this.webauthnService.verifyLogin(credential);

    if (verified) {
      req.session.isLoggedIn = true;
    }

    return { verified };
  }
}
