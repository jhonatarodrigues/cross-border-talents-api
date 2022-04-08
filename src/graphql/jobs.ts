import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Jobs {
    id: ID!
    idInterestSkills: ID!
    jobTitle: String!
    level: String
    country: String
    description: String
    interestSkills: InterestSkills
  }
`;

export const Query = `
  jobs: [Jobs!]!
  job(id: ID): Jobs
`;

export const Mutation = `
  createJobs(idInterestSkills: String!, jobTitle: String!, level: String, country: String, description: String): Jobs
`;
