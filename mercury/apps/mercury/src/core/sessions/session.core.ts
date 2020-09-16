import { INestApplication } from '@nestjs/common';
import { RedisConfig } from '@utils/redis-connection/config/redis.config';
import { get as configGet } from 'config';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as redis from 'ioredis';
import { SessionConfig } from '../config/session.config';

const sessionConfig: SessionConfig = configGet('Session');
const redisConfig: RedisConfig = configGet('Redis');

const redisStore = connectRedis(session);
const redisClient = new redis(redisConfig.port, redisConfig.host, {
  password: redisConfig.password,
});

export function setupSessions(app: INestApplication): void {
  app.use(
    session({
      name: sessionConfig.name,
      store: new redisStore({ client: redisClient }),
      secret: sessionConfig.secret,
      saveUninitialized: false,
      resave: true,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 60000 * 60 * 24,
      },
    }),
  );
}
