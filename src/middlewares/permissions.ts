import { ApolloError } from 'apollo-server-errors';
import { allow, and, not, rule, shield } from 'graphql-shield';

// Rules
const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => {
    if (ctx.authenticated.message) {
      return new ApolloError(
        ctx.authenticated.message,
        ctx.authenticated.message,
        {},
      );
    }

    if (!ctx.authenticated.id && !ctx.authenticated.email) {
      return new ApolloError('tokenExpired', 'tokenExpired', {});
    }

    return ctx.authenticated.id !== undefined;
  },
);

// Permissions
export default shield({
  Query: {
    users: and(isAuthenticated),
    user: and(isAuthenticated),
    teamLeaders: and(isAuthenticated),
    teamLeader: and(isAuthenticated),
    recruiters: and(isAuthenticated),
  },
  Mutation: {
    createUser: and(isAuthenticated),
    createTeamLeader: and(isAuthenticated),
  },
});
