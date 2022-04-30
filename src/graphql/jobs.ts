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
    date: String
  }
`;

export const Query = `
  jobs: [Jobs!]!
  job(id: ID): Jobs
`;

export const Mutation = `
  createJobs(idInterestSkills: String!, jobTitle: String!, level: String, country: String, date:String, description: String): Jobs
  removeJobs(id: ID!): Boolean
  updateJobs(id: ID!, idInterestSkills: String!, date:String, jobTitle: String!, level: String, country: String, description: String): Jobs
  `;
