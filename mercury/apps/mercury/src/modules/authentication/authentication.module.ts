import { Module } from '@nestjs/common';
import { REDIS_CLIENT_PROVIDER } from '../../core/connections/redis.connection';
import { IdentificationModule } from '../identification/identification.module';
import { AuthenticationController } from './authentication.controller';
import { WebauthnService } from './webauthn/webauthn.service';

@Module({
  imports: [IdentificationModule],
  controllers: [AuthenticationController],
  providers: [WebauthnService, REDIS_CLIENT_PROVIDER],
})
export class AuthenticationModule {}
