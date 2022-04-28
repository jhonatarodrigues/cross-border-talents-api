import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type TeamLeader {
    user: User
    id: ID,
    idUser: ID,
    department: String
  }
`;

export const Query = `
  teamLeaders: [TeamLeader!]!
  teamLeader(id: ID): TeamLeader
`;

export const Mutation = `
  createTeamLeader(name: String!, lastName: String! email: String!, phone: String, status: Boolean, department: String!): TeamLeader
  removeTeamLeader(id: ID!): Boolean
  updateTeamLeader(id: ID!, name: String!, lastName: String!, phone: String, status: Boolean, department: String!): TeamLeader
`;
