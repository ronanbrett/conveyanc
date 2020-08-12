import { INestApplication } from '@nestjs/common';
import { get as configGet } from 'config';

import { createClient } from 'redis';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { SessionConfig } from '../config/session.config';

const config: SessionConfig = configGet('Session');

const redisStore = connectRedis(session);
const redisClient = createClient({
  password: config.redisSecret,
  port: config.port,
});

export function setupSessions(app: INestApplication): void {
  app.use(
    session({
      name: config.name,
      store: new redisStore({ client: redisClient }),
      secret: config.secret,
      resave: true,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 60000 * 60 * 24,
      },
    }),
  );
}
