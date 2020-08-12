import { get as configGet } from 'config';
import * as redis from 'ioredis';
import { SessionConfig } from '../config/session.config';

const config: SessionConfig = configGet('Session');

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const REDIS_CLIENT_PROVIDER = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return redis(config.port, 'localhost', {
      password: config.redisSecret,
    });
  },
};
