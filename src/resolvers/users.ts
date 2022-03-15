import bcrypt from 'bcryptjs';

import Users from '../models/users';

interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

const Query = {
  users: () => Users.findAll(),
  user: (_: any, { id }: { id: string }) => Users.findByPk(id),
};

const Mutation = {
  createUser: async (_: any, { name, email, phone, status }: ICreateUser) => {
    // const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const verifyUser = await Users.findOne({ where: { email } });
      if (verifyUser && verifyUser.id) {
        throw new Error('userExists');
      }

      const user = await Users.create({ name, email, phone, status });

      return user;
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
