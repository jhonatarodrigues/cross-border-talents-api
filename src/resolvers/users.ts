import Users from '../models/users';

const Query = {
  users: () => Users.findAll(),
  user: (_: any, { id }: { id: string }) => Users.findByPk(id),
};

const Mutation = {
  createUser: (_: any, { name, email }: { name: string; email: string }) =>
    Users.create({ name, email }),
};

export { Query, Mutation };
