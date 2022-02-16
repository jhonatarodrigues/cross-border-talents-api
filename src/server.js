import { GraphQLServer } from 'graphql-yoga';
import path from 'path';
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema.graphql'),
  resolvers,
});


server.start(() => console.log('Server is running on localhost:4000'));