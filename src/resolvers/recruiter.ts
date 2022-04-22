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

const Query = {
  recruiters: async () => {
    const recruiter = await Recruiter.findAll({
      include: [
        {
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
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
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
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
};

export { Query, Mutation };
