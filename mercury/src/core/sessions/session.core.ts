import { INestApplication } from '@nestjs/common';
import { get as configGet } from 'config';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as redis from 'ioredis';
import { SessionConfig } from '../config/session.config';

const config: SessionConfig = configGet('Session');

const redisStore = connectRedis(session);
const redisClient = redis(config.port, 'localhost', {
  password: config.redisSecret,
});

export function setupSessions(app: INestApplication): void {
  app.use(
    session({
      name: config.name,
      store: new redisStore({ client: redisClient }),
      secret: config.secret,
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
