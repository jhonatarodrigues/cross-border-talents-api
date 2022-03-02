import Users from '../models/users';


export default {
  Query: {
    users:  () =>  Users.findAll(),
    user:  (_: any, {id}: {id: string}) =>  Users.findByPk(id),
  },

  Mutation: {
    createUser: (_: any,{name, email}:{name: string; email:string;}) => Users.create({name, email}),
  }
}