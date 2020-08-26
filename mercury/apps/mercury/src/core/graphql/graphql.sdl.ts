import { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { writeFileSync } from 'fs';
import { join } from 'path';

export function setupGraphQLSDL(app: INestApplication): void {
  const { schema } = app.get(GraphQLSchemaHost);
  console.log(schema);

  const path = join(process.cwd(), 'schemas/graphql-sdl.json');
  writeFileSync(path, JSON.stringify(schema));
}
