import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupExceptions } from './core/exceptions/exceptions.core';
import { setupGraphQLSDL } from './core/graphql/graphql.sdl';
import { httpsOptions } from './core/https/https.core';
import { setupSessions } from './core/sessions/session.core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpsOptions,
  });

  setupExceptions(app);
  setupSessions(app);

  await app.listen(6001);

  setupGraphQLSDL(app);
}

bootstrap();
