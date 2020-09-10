import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { get } from 'config';
import { join } from 'path';
import { GraphqlConfig } from '../config/graphql.config';

import { CODES as ISO_CURRENCY_CODES } from 'graphql-iso-enums/types/ISOCurrency';
import { CODES as ISO_COUNTRY_CODES } from 'graphql-iso-enums/types/ISOTerritory';

const config: GraphqlConfig = get('Graphql');

import GraphQLJSON from 'graphql-type-json';
import { Point, Polygon } from 'graphql-geojson-scalar-types';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: config.debug,
      playground: true,

      // sortSchema: true,
      typePaths: [join(process.cwd(), './**/*.graphql')],
      resolvers: {
        ISOCountry: ISO_COUNTRY_CODES,
        ISOCurrency: ISO_CURRENCY_CODES,
        JSON: GraphQLJSON,
        GeoJSONPointScalar: Point,
        GeoJSONPolygonScalar: Polygon,
      },
      definitions: {
        path: join(process.cwd(), 'schemas/graphql.ts'),
        outputAs: 'class',
      },
      include: [],
    }),
  ],
})
export class GraphqlCoreModule {}
