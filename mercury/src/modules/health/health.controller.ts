import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('health')
export class HealthController {
  @Get()
  checkHealth(@Req() req: Request): boolean {
    console.log(req.session);
    return true;
  }
}
