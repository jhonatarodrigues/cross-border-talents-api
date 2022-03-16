import { ApolloError } from 'apollo-server-errors';
import { and, rule, shield } from 'graphql-shield';

// Rules
const isAuthenticated = rule()(async (parent, args, ctx) => {
  if (ctx.authenticated.message) {
    return new ApolloError(
      ctx.authenticated.message,
      ctx.authenticated.message,
      {},
    );
  }

  return ctx.authenticated.id !== undefined;
});

// Permissions
export default shield({
  Query: {
    users: and(isAuthenticated),
  },
  Mutation: {
    createUser: and(isAuthenticated),
  },
});
