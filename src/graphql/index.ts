import { ITypedef, ITypeDefinitions } from 'graphql-tools';

import * as Auth from './auth';
import * as User from './user';

const TypeDefs = `
  ${User.TypeDefs}
  ${Auth.TypeDefs}
`;

const Query = `
  ${User.Query} 
`;
const Mutation = `
  ${User.Mutation}
  ${Auth.Mutation}
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
