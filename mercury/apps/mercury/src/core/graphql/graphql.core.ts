import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { get } from 'config';
import { join } from 'path';
import { GraphqlConfig } from '../config/graphql.config';

const config: GraphqlConfig = get('Graphql');

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: config.debug,
      playground: true,
      // autoSchemaFile: join(process.cwd(), 'schemas/schema.gql'),
      // sortSchema: true,
      typePaths: [join(process.cwd(), './**/*.graphql')],
      definitions: {
        path: join(process.cwd(), 'schemas/graphql.ts'),
      },
      include: [],
    }),
  ],
})
export class GraphqlCoreModule {}
