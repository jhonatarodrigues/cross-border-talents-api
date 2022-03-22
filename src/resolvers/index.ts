import * as Auth from './auth';
import * as Companies from './companies';
import * as Recruiter from './recruiter';
import * as TeamLeader from './teamLeader';
import * as User from './users';

export default {
  Query: {
    ...User.Query,
    ...TeamLeader.Query,
    ...Recruiter.Query,
    ...Companies.Query,
  },
  Mutation: {
    ...User.Mutation,
    ...Auth.Mutation,
    ...TeamLeader.Mutation,
    ...Recruiter.Mutation,
    ...Companies.Mutation,
  },
};
