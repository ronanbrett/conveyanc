import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

@Controller('health')
export class HealthController {
  @Get()
  checkHealth(@Req() req: Request): any {
    if (req.session.isLoggedIn) {
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
