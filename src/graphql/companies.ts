import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Companie {
    id: ID!
    idUser: ID!
    companyLogo: String
    country: String
    user: User
  }
  type ReturnCompanie {
    id: String
  }

`;

export const Query = `
  companies: [Companie]
  companie(id: ID): Companie
`;

export const Mutation = `
  createCompanie(file: Upload!): ReturnCompanie
`;
