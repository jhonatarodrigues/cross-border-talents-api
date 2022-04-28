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
interface IUpdateUser extends ICreateUser {
  id: string;
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
  removeTeamLeader: async (_: any, { id }: { id: string }) => {
    try {
      const teamLeader = await TeamLeader.findOne({ where: { id } });
      if (!teamLeader) {
        throw new Error('teamLeaderNotFound');
      }

      const user = await Users.findOne({ where: { id: teamLeader.idUser } });
      if (!user) {
        throw new Error('userNotFound');
      }

      await teamLeader.destroy();
      await user.destroy();

      return true;
    } catch (error: any) {
      return error;
    }
  },
  updateTeamLeader: async (
    _: any,
    { id, name, lastName, phone, status, department }: IUpdateUser,
  ) => {
    try {
      const teamLeader = await TeamLeader.findOne({ where: { id } });
      if (!teamLeader) {
        throw new Error('teamLeaderNotFound');
      }

      const user = await Users.findOne({ where: { id: teamLeader.idUser } });
      if (!user) {
        throw new Error('userNotFound');
      }

      await teamLeader.update({
        department,
      });
      await user.update({
        name,
        lastName,
        phone,
        status,
      });

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
