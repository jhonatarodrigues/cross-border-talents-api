import { ITypedef, ITypeDefinitions } from 'graphql-tools';

import * as Auth from './auth';
import * as Candidate from './candidate';
import * as Companies from './companies';
import * as Contact from './contact';
import * as Contract from './contract';
import * as Country from './country';
import * as InterestSkill from './interestSkills';
import * as Jobs from './jobs';
import * as MailChimp from './mailchimp';
import * as Recruiter from './recruiter';
import * as TalentPool from './talentPool';
import * as TalentPoolInterest from './talentPoolInterest';
import * as TeamLeader from './teamLeader';
import * as Testimonials from './testimonials';
import * as User from './user';

const TypeDefs = `
  ${User.TypeDefs}
  ${TeamLeader.TypeDefs}
  ${Auth.TypeDefs}
  ${Recruiter.TypeDefs}
  ${Companies.TypeDefs}
  ${Country.TypeDefs}
  ${Candidate.TypeDefs}
  ${InterestSkill.TypeDefs}
  ${Jobs.TypeDefs}
  ${Testimonials.TypeDefs}
  ${TalentPool.TypeDefs}
  ${TalentPoolInterest.TypeDefs}
  ${Contract.TypeDefs}
  ${MailChimp.TypeDefs}
`;

const Query = `
  ${User.Query} 
  ${TeamLeader.Query}
  ${Recruiter.Query}
  ${Companies.Query}
  ${Country.Query}
  ${Candidate.Query}
  ${InterestSkill.Query}
  ${Jobs.Query}
  ${Testimonials.Query}
  ${TalentPool.Query}
  ${TalentPoolInterest.Query}
  ${Contract.Query}
  ${MailChimp.Query}
`;
const Mutation = `
  ${User.Mutation}
  ${Auth.Mutation}
  ${TeamLeader.Mutation}
  ${Recruiter.Mutation}
  ${Companies.Mutation}
  ${Candidate.Mutation}
  ${InterestSkill.Mutation}
  ${Jobs.Mutation}
  ${Testimonials.Mutation}
  ${TalentPool.Mutation}
  ${TalentPoolInterest.Mutation}
  ${Contact.Mutation}
  ${MailChimp.TypeDefs}
`;

const Definition: ITypedef = `
  ${TypeDefs}
  type Query {
    ${Query}
    
  }
  type Mutation {
    ${Mutation}
  }
`;

const typeDefs: ITypeDefinitions = [Definition];

export default typeDefs;
