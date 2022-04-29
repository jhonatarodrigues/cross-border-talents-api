import bcrypt from 'bcryptjs';

import Recruiter from '../models/recruiter';
import TeamLeader from '../models/teamLeader';
import Users from '../models/users';

interface ICreateRecruiter {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  status: boolean;
  teamLeader: number;
  interestSkills: string;
}
interface IUpdateRecruiter extends ICreateRecruiter {
  id: string;
}

const Query = {
  recruiters: async () => {
    const recruiter = await Recruiter.findAll({
      include: [
        {
          model: Users,
          required: false,
          as: 'user',
        },
        {
          model: TeamLeader,
          required: false,
          as: 'userTeamLeader',
          include: [
            {
              model: Users,
              required: false,
              as: 'user',
            },
          ],
        },
      ],
      order: [['id', 'DESC']],
    });

    return recruiter;
  },
  recruiter: (_: any, { id }: { id: string }) => {
    if (!id) {
      throw new Error('recruiterIdNotFound');
    }

    const recruiter = Recruiter.findOne({
      where: { id },
      include: [
        {
          model: Users,
          required: false,
          as: 'user',
        },
        {
          model: TeamLeader,
          required: false,
          as: 'userTeamLeader',
          include: [
            {
              model: Users,
              required: false,
              as: 'user',
            },
          ],
        },
      ],
    });

    return recruiter;
  },
};

const Mutation = {
  createRecruiter: async (
    _: any,
    {
      name,
      lastName,
      email,
      phone,
      status,
      teamLeader,
      interestSkills,
    }: ICreateRecruiter,
  ) => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    try {
      const verifyUser = await Users.findOne({ where: { email } });
      if (verifyUser && verifyUser.id) {
        throw new Error('recruiterExists');
      }

      const recruiterValid = await TeamLeader.findOne({
        where: { id: teamLeader },
      });

      if (!recruiterValid) {
        throw new Error('recruiterNotFound');
      }

      const user = await Users.create({
        name,
        lastName,
        email,
        phone,
        status,
        accessLevel: 3,
        password: hashedPassword,
      });

      if (!user.id) {
        throw new Error('norCreateuser');
      }

      const recruiterAdd = await Recruiter.create({
        idUser: user.id,
        teamLeader: teamLeader,
        interestSkills,
      });

      if (!recruiterAdd.id) {
        throw new Error('recruiterNotCreate');
      }

      return { user: user, recruiter: recruiterAdd };
    } catch (error: any) {
      return error;
    }
  },
  removeRecruiter: async (_: any, { id }: { id: string }) => {
    try {
      const recruiter = await Recruiter.findOne({ where: { id } });
      if (!recruiter) {
        throw new Error('recruiterNotFound');
      }

      const user = await Users.findOne({ where: { id: recruiter.idUser } });
      if (!user) {
        throw new Error('userNotFound');
      }

      await recruiter.destroy();
      await user.destroy();

      return true;
    } catch (error: any) {
      return error;
    }
  },
  updateRecruiter: async (
    _: any,
    {
      id,
      name,
      lastName,
      phone,
      status,
      teamLeader,
      interestSkills,
    }: IUpdateRecruiter,
  ) => {
    try {
      const recruiter = await Recruiter.findOne({ where: { id } });
      if (!recruiter) {
        throw new Error('recruiterNotFound');
      }

      const user = await Users.findOne({ where: { id: recruiter.idUser } });
      if (!user) {
        throw new Error('userNotFound');
      }

      const recruiterAdd = await recruiter.update({
        teamLeader,
        interestSkills,
      });
      const userAdd = await user.update({
        name,
        lastName,
        phone,
        status,
      });

      return { user: userAdd, recruiter: recruiterAdd };
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
