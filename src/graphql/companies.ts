import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Companie {
    id: ID!
    idUser: ID!
    companyLogo: String
    country: String
    companyName: String
    userTeamLeader: User
    user: User
  }
  type ReturnCompanie {
    user: User
    companie: Companie
  }

`;

export const Query = `
  companies: [Companie]
  companie(id: ID): Companie
`;

export const Mutation = `
  createCompanie(name: String!, email: String!, phone: String, status: Boolean, country: String, companyName: String, teamLeader: String, companyLogo: String): ReturnCompanie
`;
