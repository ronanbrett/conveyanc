import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import {
  AttestationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import { Request } from 'express';
import { User } from '../identification/identification.model';
import { WebauthnService } from './webauthn/webauthn.service';

/**
 * TODO
 * Implement this using strategies instead of locking it to Webauthn
 */

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly webauthnService: WebauthnService) {}

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
  async verifyLogin(@Req() req: Request): Promise<{ verified: boolean }> {
    const credential = req.body;
    const username = req.session.user.username;

    const { verified, user } = await this.webauthnService.verifyLogin(
      credential,
      username,
    );

    if (verified) {
      req.session.isLoggedIn = true;
      req.session.user = user;
    }

    return { verified };
  }

  @Get('logout')
  async logout(@Req() req: Request): Promise<boolean> {
    const username = req.session.user.username;
    req.session.destroy(err => {
      console.log(err);
    });
    return await this.webauthnService.logout(username);
  }
}
