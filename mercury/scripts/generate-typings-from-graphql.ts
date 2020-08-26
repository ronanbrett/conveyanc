import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(process.cwd(), 'libs/**/*.graphql')],
  path: join(process.cwd(), 'schemas/graphql.ts'),
  outputAs: 'class',
  watch: true,
});
