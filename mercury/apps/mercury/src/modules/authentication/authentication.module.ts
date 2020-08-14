import { Module } from '@nestjs/common';
import { RedisConnectionModule } from '@utils/redis-connection';
import { IdentificationModule } from '../identification/identification.module';
import { AuthenticationController } from './authentication.controller';
import { WebauthnService } from './webauthn/webauthn.service';

@Module({
  imports: [IdentificationModule, RedisConnectionModule],
  controllers: [AuthenticationController],
  providers: [WebauthnService],
})
export class AuthenticationModule {}
