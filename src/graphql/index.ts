import { ITypedef, ITypeDefinitions } from 'graphql-tools';

import * as Auth from './auth';
import * as Candidate from './candidate';
import * as Companies from './companies';
import * as Country from './country';
import * as InterestSkill from './interestSkills';
import * as Jobs from './jobs';
import * as Recruiter from './recruiter';
import * as TeamLeader from './teamLeader';
import * as User from './user';

const TypeDefs = `
  ${User.TypeDefs}
  ${Auth.TypeDefs}
  ${Recruiter.TypeDefs}
  ${Companies.TypeDefs}
  ${Country.TypeDefs}
  ${Candidate.TypeDefs}
  ${InterestSkill.TypeDefs}
  ${Jobs.TypeDefs}
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
