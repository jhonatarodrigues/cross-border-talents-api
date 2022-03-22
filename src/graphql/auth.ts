import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type AuthPayload {
    token: String!
    refreshToken: String!
    user: User!
  }
`;

export const Mutation = `
  login (email: String!, password: String!): AuthPayload!
  refreshToken (refreshToken: String!): AuthPayload!
`;
