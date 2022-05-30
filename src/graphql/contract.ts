import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type TypeContract {
    id: ID!
    name: String!
    color: String!
  }
`;

export const Query = `
  typeContracts: [TypeContract!]!
`;
