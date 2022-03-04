import bcrypt from 'bcryptjs';

import Users from '../models/users';

const Query = {
  users: () => Users.findAll(),
  user: (_: any, { id }: { id: string }) => Users.findByPk(id),
};

const Mutation = {
  createUser: async (_: any, { name, email, password }: { name: string; email: string; password: string }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ name, email, password:hashedPassword });

    return user;
  }
    
};

export { Query, Mutation };
