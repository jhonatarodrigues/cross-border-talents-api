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
    date: Date
  }
`;

export const Query = `
  jobs: [Jobs!]!
  job(id: ID): Jobs
`;

export const Mutation = `
  createJobs(idInterestSkills: String!, jobTitle: String!, level: String, country: String, date:Date, description: String): Jobs
  removeJobs(id: ID!): Boolean
  updateJobs(id: ID!, idInterestSkills: String!, date:Date, jobTitle: String!, level: String, country: String, description: String): Jobs
  `;
