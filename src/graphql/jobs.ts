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
    requirements: String
    benefits: String
  }
  type InfoPage{
    currentPage: Int
    maxPage: Int
  } 
  type SearchJobs {
    jobs: [Jobs]
    infoPage: InfoPage
    numberAllCandidates: Int
  }
`;

export const Query = `
  jobs: [Jobs!]!
  job(id: ID): Jobs
  jobsSearch(
    page: Int
    itensPerPage: Int
    
    search: String
    department: String
    country: String
    region: String
    typeContract: String
    experienceLevel: String
    language: String
  ): SearchJobs
`;

export const Mutation = `
  createJobs(idInterestSkills: String!, jobTitle: String!, level: String, country: String, date:String, description: String, requirements: String
    benefits: String): Jobs
  removeJobs(id: ID!): Boolean
  updateJobs(id: ID!, idInterestSkills: String!, date:String, jobTitle: String!, level: String, country: String, description: String, requirements: String
    benefits: String): Jobs
  applyNow(idJob: ID!, name: String!, email: String!, phone: String!): Boolean
`;
