import * as Auth from './auth';
import * as Candidate from './candidate';
import * as Companies from './companies';
import * as Country from './country';
import * as Department from './department';
import * as InterestSkills from './interestSkills';
import * as Jobs from './jobs';
import * as Recruiter from './recruiter';
import * as TeamLeader from './teamLeader';
import * as Testimonials from './testimonials';
import * as User from './users';

export default {
  Query: {
    ...User.Query,
    ...TeamLeader.Query,
    ...Recruiter.Query,
    ...Companies.Query,
    ...Country.Query,
    ...Candidate.Query,
    ...InterestSkills.Query,
    ...Jobs.Query,
    ...Testimonials.Query,
    ...Department.Query,
  },
  Mutation: {
    ...User.Mutation,
    ...Auth.Mutation,
    ...TeamLeader.Mutation,
    ...Recruiter.Mutation,
    ...Companies.Mutation,
    ...Candidate.Mutation,
    ...InterestSkills.Mutation,
    ...Jobs.Mutation,
    ...Testimonials.Mutation,
  },
};
