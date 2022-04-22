import bcrypt from 'bcryptjs';

import Companies from '../models/companies';
import InterestSkills from '../models/intrestSkills';
import TeamLeader from '../models/teamLeader';
import Users from '../models/users';

interface ICreateCompanie {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  status: boolean;

  country: string;
  companyName: string;
  companyLogo: string;

  industry: string;
  site: string;
  size: string;
  address1: string;
  address2: string;
  city: string;
  facebook: string;
  instagram: string;
  linkedin: string;

  teamLeader: string;
  idInterestSkills: string;
}

const Query = {
  companies: async () => {
    const db = await Companies.findAll({
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
        {
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
      order: [['id', 'DESC']],
    });

    return db;
  },
  companie: (_: any, { id }: { id: string }) => {
    if (!id) {
      throw new Error('companieIdNotFound');
    }

    const db = Companies.findOne({
      where: { id },
      include: [
        {
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
          as: 'user',
        },
        {
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
          as: 'userTeamLeader',
        },
        {
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
    });

    return db;
  },
};

const Mutation = {
  createCompanie: async (
    _: any,
    {
      name,
      lastName,
      email,
      phone,
      status,

      country,
      companyName,
      companyLogo,

      industry,
      site,
      size,
      address1,
      address2,
      city,
      facebook,
      instagram,
      linkedin,

      teamLeader,
      idInterestSkills,
    }: ICreateCompanie,
  ) => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    try {
      const verifyUser = await Users.findOne({ where: { email } });
      if (verifyUser && verifyUser.id) {
        throw new Error('companieExists');
      }

      if (teamLeader) {
        const verifyTeamLeader = await TeamLeader.findOne({
          where: { id: teamLeader },
        });
        if (!verifyTeamLeader) {
          throw new Error('teamLeaderNotFound');
        }
      }

      const user = await Users.create({
        name,
        lastName,
        email,
        phone,
        status,
        accessLevel: 4,
        password: hashedPassword,
      });

      if (!user.id) {
        throw new Error('norCreateuser');
      }

      const companieAdd = await Companies.create({
        idUser: user.id,
        companyLogo,
        country,
        companyName,

        industry,
        site,
        size,
        address1,
        address2,
        city,
        facebook,
        instagram,
        linkedin,

        teamLeader,
        idInterestSkills,
      });

      if (!companieAdd.id) {
        throw new Error('companieNotCreate');
      }

      return { user: user, companie: companieAdd };
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
