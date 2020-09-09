import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { get } from 'config';
import { join } from 'path';
import { GraphqlConfig } from '../config/graphql.config';

const config: GraphqlConfig = get('Graphql');

import GraphQLJSON from 'graphql-type-json';
import { Point } from 'graphql-geojson-scalar-types';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: config.debug,
      playground: true,

      // sortSchema: true,
      typePaths: [join(process.cwd(), './**/*.graphql')],
      resolvers: { JSON: GraphQLJSON, Point },
      definitions: {
        path: join(process.cwd(), 'schemas/graphql.ts'),
        outputAs: 'class',
      },
      include: [],
    }),
  ],
})
export class GraphqlCoreModule {}
