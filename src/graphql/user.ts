import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type User {
    id: ID!
    name: String!
    lastName: String
    email: String!
    phone: String
    status: Boolean!
    accessLevel: Int!
  }
`;

export const Query = `
  users: [User!]!
  user(id: ID): User
`;

export const Mutation = `
  createUser(name: String!, lastName: String!, email: String!, phone: String, status: Boolean): User
  removeUser(id: ID!): Boolean
`;
