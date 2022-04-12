import bcrypt from 'bcryptjs';

import Users from '../models/users';

interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

const Query = {
  teamLeaders: () =>
    Users.findAll({ where: { accesslevel: 2 }, order: [['id', 'DESC']] }),
  teamLeader: (_: any, { id }: { id: string }) => Users.findByPk(id),
};

const Mutation = {
  createTeamLeader: async (
    _: any,
    { name, email, phone, status }: ICreateUser,
  ) => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    console.log('\n\n\n\n name', name);

    try {
      const verifyUser = await Users.findOne({ where: { email } });
      if (verifyUser && verifyUser.id) {
        throw new Error('teamLeaderExists');
      }

      const user = await Users.create({
        name,
        email,
        phone,
        status,
        accessLevel: 2,
        password: hashedPassword,
      });

      return user;
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
