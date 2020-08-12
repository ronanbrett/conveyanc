import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerModule } from 'nestjs-pino';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [LoggerModule.forRoot(), AuthenticationModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
