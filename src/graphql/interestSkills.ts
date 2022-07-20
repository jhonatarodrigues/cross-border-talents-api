import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type InterestSkills {
    id: ID!
    name: String!
    internal: Boolean
  }
`;

export const Query = `
  interestSkills: [InterestSkills!]!
  interestSkill(id: ID): InterestSkills
`;

export const Mutation = `
  createInterestSkill(name: String!, internal: Boolean): InterestSkills
  removeInterestSkill(id: ID!): Boolean
  updateInterestSkill(id: ID!, name: String!, internal: Boolean): InterestSkills
`;
