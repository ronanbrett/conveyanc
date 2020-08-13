import { LoggerModule } from 'nestjs-pino';
import { get } from 'config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint:
          get('env') !== 'prod'
            ? {
                levelFirst: true,
                colorize: true,
              }
            : false,
      },
    }),
  ],
})
export class LoggerCoreModule {}
