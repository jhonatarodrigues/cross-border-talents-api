import { GraphQLServer } from 'graphql-yoga';
import path from 'path';
import db from './db';

import Schema from './graphql/schema';
import resolvers from './resolvers';

// -- sincroniza o banco de dados
db.sync();

const server = new GraphQLServer({
  typeDefs: Schema,
  resolvers,
});

server.start(() => console.log('Server is running on localhost:4000'));
