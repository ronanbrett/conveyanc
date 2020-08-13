import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { REDIS_CLIENT_PROVIDER } from 'src/core/connections/redis.connection';
import { User, UserSchema } from '../identification/identification.model';
import { IdentificationModule } from '../identification/identification.module';
import { AuthenticationController } from './authentication.controller';
import { WebauthnService } from './webauthn/webauthn.service';

@Module({
  imports: [IdentificationModule],
  controllers: [AuthenticationController],
  providers: [WebauthnService, REDIS_CLIENT_PROVIDER],
})
export class AuthenticationModule {}
