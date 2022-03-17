import { ITypedef, ITypeDefinitions } from 'graphql-tools';

import * as Auth from './auth';
import * as Recruiter from './recruiter';
import * as TeamLeader from './teamLeader';
import * as User from './user';

const TypeDefs = `
  ${User.TypeDefs}
  ${Auth.TypeDefs}
  ${Recruiter.TypeDefs}
`;

const Query = `
  ${User.Query} 
  ${TeamLeader.Query}
  ${Recruiter.Query}
`;
const Mutation = `
  ${User.Mutation}
  ${Auth.Mutation}
  ${TeamLeader.Mutation}
  ${Recruiter.Mutation}
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
