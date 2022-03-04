import {rule, shield, and} from 'graphql-shield'


// Rules
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
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