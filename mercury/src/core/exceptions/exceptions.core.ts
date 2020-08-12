import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './http.exception';

export function setupExceptions(app: INestApplication): void {
  app.useGlobalFilters(new HttpExceptionFilter());
}
