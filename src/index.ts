import 'dotenv/config'
import { GraphQLServer } from 'graphql-yoga';
import db from './db';

import verifyJWT from './verifyJWT';
import Schema from './graphql';
import resolvers from './resolvers';
import permissions from './middlewares/permissions';

// -- sincroniza o banco de dados
db.sync();

const server = new GraphQLServer({
  typeDefs: Schema,
  resolvers,
  middlewares: [permissions],
  context: (req) => ({ 
    authenticated: verifyJWT(req),
  })
});

server.start(() => console.log('Server is running on localhost:4000'));
