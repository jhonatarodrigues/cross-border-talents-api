import bcrypt from 'bcryptjs';

import TeamLeader from '../models/teamLeader';
import Users from '../models/users';

interface ICreateUser {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  status: boolean;
  department: string;
}

const Query = {
  teamLeaders: async () => {
    const teamLeaders = await TeamLeader.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: Users,
          required: false,
          as: 'user',
        },
      ],
    });

    return teamLeaders;
  },
  teamLeader: async (_: any, { id }: { id: string }) => {
    const teamLeaders = await TeamLeader.findOne({
      where: { id: id },
      include: [
        {
          model: Users,
          required: false,
          as: 'user',
        },
      ],
    });

    return teamLeaders;
  },
};

const Mutation = {
  createTeamLeader: async (
    _: any,
    { name, lastName, email, phone, status, department }: ICreateUser,
  ) => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    try {
      const verifyUser = await Users.findOne({ where: { email } });
      if (verifyUser && verifyUser.id) {
        throw new Error('teamLeaderExists');
      }

      const user = await Users.create({
        name,
        lastName,
        email,
        phone,
        status,
        accessLevel: 2,
        password: hashedPassword,
      });

      const teamLeader = await TeamLeader.create({
        idUser: user.id,
        department,
      });

      console.log('\n\n\n\n\nteamLeader', teamLeader);

      return {
        user,
        department: teamLeader.department,
        id: teamLeader.id,
        idUser: teamLeader.idUser,
      };
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
