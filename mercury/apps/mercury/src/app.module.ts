import { Module } from '@nestjs/common';
import { MammonModule } from '@libs/mammon';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoConnectionModule } from './core/connections/mongo.connection';
import { GraphqlCoreModule } from './core/graphql/graphql.core';
import { LoggerCoreModule } from './core/logger/logger.core';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    LoggerCoreModule,
    MongoConnectionModule,
    GraphqlCoreModule,
    AuthenticationModule,
    HealthModule,
    MammonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
