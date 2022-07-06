import * as Auth from './auth';
import * as Candidate from './candidate';
import * as Companies from './companies';
import * as Contact from './contact';
import * as Contract from './contract';
import * as Country from './country';
import * as InterestSkills from './interestSkills';
import * as Jobs from './jobs';
import * as MailChimp from './mailChimp';
import * as Recruiter from './recruiter';
import * as TalentPool from './talentPool';
import * as TalentPoolInterest from './talentPoolInterest';
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
    ...TalentPool.Query,
    ...TalentPoolInterest.Query,
    ...Contract.Query,
    ...MailChimp.Query,
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
    ...TalentPool.Mutation,
    ...TalentPoolInterest.Mutation,
    ...Contact.Mutation,
    ...MailChimp.Mutation,
  },
};
