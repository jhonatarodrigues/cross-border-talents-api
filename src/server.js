import { GraphQLServer } from 'graphql-yoga';
import path from 'path';
import db from './db';

import resolvers from './resolvers'


// -- sincroniza o banco de dados
db.sync();

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema.graphql'),
  resolvers,
});


server.start(() => console.log('Server is running on localhost:4000'));