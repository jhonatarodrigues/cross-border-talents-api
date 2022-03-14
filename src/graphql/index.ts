import { ITypeDefinitions, ITypedef } from 'graphql-tools';
import * as User from './user';
import * as Auth from './auth';

const TypeDefs = `
  ${User.TypeDefs}
  ${Auth.TypeDefs}
`;

const Query = `
  ${User.Query} 
`
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


const typeDefs: ITypeDefinitions = [Definition]

export default typeDefs;