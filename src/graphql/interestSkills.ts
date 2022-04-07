import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type InterestSkills {
    id: ID!
    name: String!
  }
`;

export const Query = `
  interestSkills: [InterestSkills!]!
  interestSkill(id: ID): InterestSkills
`;

export const Mutation = `
  createInterestSkill(name: String!): InterestSkills
`;
