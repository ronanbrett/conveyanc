import { Module } from '@nestjs/common';
import { RedisConnectionService } from './redis-connection.service';

import { get as configGet } from 'config';
import * as redis from 'ioredis';
import { RedisConfig } from './config/redis.config';

const config: RedisConfig = configGet('Redis');

export const REDIS_CLIENT = 'REDIS_CLIENT';

const REDIS_CLIENT_PROVIDER = {
  provide: 'REDIS_CLIENT',
  useFactory: (): redis.Redis => {
    return new redis(config.port, config.host, {
      keyPrefix: config.keyPrefix,
      password: config.password,
    });
  },
};

@Module({
  providers: [RedisConnectionService, REDIS_CLIENT_PROVIDER],
  exports: [RedisConnectionService, REDIS_CLIENT_PROVIDER],
})
export class RedisConnectionModule {}
