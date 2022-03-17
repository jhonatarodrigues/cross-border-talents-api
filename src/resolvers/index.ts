import * as Auth from './auth';
import * as Recruiter from './recruiter';
import * as TeamLeader from './teamLeader';
import * as User from './users';

export default {
  Query: {
    ...User.Query,
    ...TeamLeader.Query,
    ...Recruiter.Query,
  },
  Mutation: {
    ...User.Mutation,
    ...Auth.Mutation,
    ...TeamLeader.Mutation,
    ...Recruiter.Mutation,
  },
};
