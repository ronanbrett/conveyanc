import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import {
  cognitoClient,
  generateCognitoToken,
} from '../../core/aws/cognito-aws.core';

@Controller('health')
export class HealthController {
  @Get()
  async checkHealth(@Req() req: Request): Promise<any> {
    if (req.session.isLoggedIn) {
      const { user, credId } = req.session;

      const awsToken = await cognitoClient.getOpenIdTokenForDeveloperIdentity(
        generateCognitoToken(user.username, credId),
      );

      user.aws = awsToken;
      user.aws.expiresIn = 86400;
      // user.aws.expiresIn = 3600;
      req.session.user = user;

      return {
        user: req.session.user,
        loggedIn: true,
      };
    }
    return {
      loggedIn: false,
    };
  }
}
