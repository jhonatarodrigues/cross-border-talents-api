import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Recruiter {
    id: ID!
    idUser: ID!
    teamLeader: ID!
    interestSkills: String
    user: User
    userTeamLeader: User
  }
  type ReturnRecruiter {
    user: User
    recruiter: Recruiter
  }

`;

export const Query = `
  recruiters: [Recruiter]
  recruiter(id: ID): Recruiter
`;

export const Mutation = `
  createRecruiter(name: String!, lastName: String!, email: String!, phone: String, status: Boolean, teamLeader: Int!, interestSkills: String!): ReturnRecruiter
`;
