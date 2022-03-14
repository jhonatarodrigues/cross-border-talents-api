import 'dotenv/config'
import { GraphQLServer } from 'graphql-yoga';
import db from './db';

import  formatError  from './util/formatError';
import verifyJWT from './verifyJWT';
import Schema from './graphql';
import resolvers from './resolvers';
import permissions from './middlewares/permissions';
import errorHandler from './middlewares/error';

// -- sincroniza o banco de dados
db.sync();



const server = new GraphQLServer({
  typeDefs: Schema,
  resolvers,
  middlewares: [errorHandler, permissions ],
  context: (req) => ({ 
    authenticated: verifyJWT(req),
  }),
});

server.start({
  formatError,
}).then(() => console.log(`Server is running on http://localhost:4000`));
