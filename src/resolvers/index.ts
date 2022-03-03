import * as User from './users';

export default {
  Query: {
    ...User.Query,
  },
  Mutation: {
    ...User.Mutation,
  },
};
