import * as User from './users';
import * as Auth from './auth';

export default {
  Query: {
    ...User.Query,
  },
  Mutation: {
    ...User.Mutation,
    ...Auth.Mutation,
  },
};
