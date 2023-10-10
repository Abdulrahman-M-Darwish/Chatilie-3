import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./**/*.{graphql,gql}'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'interface',
  watch: true,
  emitTypenameField: true,
});
