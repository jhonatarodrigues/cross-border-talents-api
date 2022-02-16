const users = [
  {id: 1, name: 'John', email: 'teste'},
  {id: 2, name: 'John2', email: 'test2222e'},
]

module.exports={
  Query: {
    users: () => users,
    user: () => users[0],
  },

  Mutation: {
    createUser: () => users[0],
  }
}