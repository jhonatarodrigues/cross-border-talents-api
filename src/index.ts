import 'dotenv/config';

import { GraphQLServer } from 'graphql-yoga';

import db from './db';
import Schema from './graphql';
import errorHandler from './middlewares/error';
import permissions from './middlewares/permissions';
import resolvers from './resolvers';
import formatError from './util/formatError';
import verifyJWT from './verifyJWT';

// -- sincroniza o banco de dados
db.sync();

const server = new GraphQLServer({
  typeDefs: Schema,
  resolvers,
  middlewares: [errorHandler, permissions],
  context: (req) => ({
    ...req,
    authenticated: verifyJWT(req),
  }),
});

server
  .start({
    formatError,
  })
  .then(() => console.log(`Server is running on http://localhost:4000`));
