import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { WebauthnService } from './webauthn/webauthn.service';

@Module({
  controllers: [AuthenticationController],
  providers: [WebauthnService],
})
export class AuthenticationModule {}
