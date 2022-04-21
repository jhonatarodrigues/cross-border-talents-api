import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Department {
    id: ID!
    name: String!
  }

`;

export const Query = `
  departments: [Department]
`;
