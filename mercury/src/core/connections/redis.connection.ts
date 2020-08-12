import { get as configGet } from 'config';
import * as redis from 'ioredis';
import { RedisConfig } from '../config/redis.config';

const config: RedisConfig = configGet('Session');

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const REDIS_CLIENT_PROVIDER = {
  provide: 'REDIS_CLIENT',
  useFactory: (): redis.Redis => {
    return redis(config.port, config.host, {
      keyPrefix: config.keyPrefix,
      password: config.password,
    });
  },
};
