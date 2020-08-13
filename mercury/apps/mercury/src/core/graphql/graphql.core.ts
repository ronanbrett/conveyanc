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
      autoSchemaFile: join(process.cwd(), 'schemas/schema.gql'),
      sortSchema: true,
      include: [],
    }),
  ],
})
export class GraphqlCoreModule {}
