import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type UserTalentPool {
    id: ID
    idCandidate: ID
    idUser: ID
    idTeamLeader: ID
    data: String
    profile: String
    observation: String
    softwares: String
    education: String
    experience: String
    charge: String
    languages: String
    status: Boolean

    user: User
    teamLeader: TeamLeader
    candidate: Candidate
  }
`;

export const Query = `
  talentPools(search: String, limit: String, country: String, department: String, language: String, teamLeader: string): [UserTalentPool]
  talentPool(idUser: ID!): UserTalentPool
`;

export const Mutation = `
  addUserTalentPool(token: String!): Boolean
  moveUserTalentPool(
    idUser: ID
    idCandidate: ID
    profile: String
    observation: String
    softwares: String
    education: String
    experience: String
    languages: String
    charge: String
    status: Boolean
  ): UserTalentPool
`;
