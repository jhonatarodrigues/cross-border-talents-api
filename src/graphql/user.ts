import {  ITypedef } from 'graphql-tools';

const def: ITypedef = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID): User
  }
  
  type Mutation {
    createUser(name: String!, email: String!): User
  }  
`;


export default def;
