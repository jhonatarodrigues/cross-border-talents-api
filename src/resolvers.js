import Users from './models/users';


module.exports={
  Query: {
    users:  () =>  Users.findAll(),
    user:  (_, {id}) =>  Users.findByPk(id),
  },

  Mutation: {
    createUser: (_,{name, email}) => Users.create({name, email}),
  }
}