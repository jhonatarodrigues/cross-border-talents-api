export const Query = `
  teamLeaders: [User!]!
  teamLeader(id: ID): User
`;

export const Mutation = `
  createTeamLeader(name: String!, lastName: String! email: String!, phone: String, status: Boolean): User
`;
