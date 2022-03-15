import * as Auth from './auth';
import * as User from './users';

export default {
  Query: {
    ...User.Query,
  },
  Mutation: {
    ...User.Mutation,
    ...Auth.Mutation,
  },
};
