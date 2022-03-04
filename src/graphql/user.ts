import {  ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String!
    status: Boolean!
  }
`;

export const Query = `
  users: [User!]!
  user(id: ID): User
`;

export const Mutation = `
  createUser(name: String!, email: String!, password: String!): User
`;

