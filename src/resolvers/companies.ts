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

interface IUpdateCompanie extends ICreateCompanie {
  id: string;
}

const Query = {
  companies: async () => {
    const db = await Companies.findAll({
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
  companie: async (_: any, { id, idUser }: { id: string; idUser: string }) => {
    const db = await Companies.findOne({
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
        {
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
      order: [['id', 'DESC']],
      where: {
        ...(id ? { id: id } : {}),
        ...(idUser ? { idUser: idUser } : {}),
      },
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
      status = false,

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

        ...(teamLeader ? { teamLeader } : {}),
        ...(idInterestSkills ? { idInterestSkills } : {}),
      });

      if (!companieAdd.id) {
        throw new Error('companieNotCreate');
      }

      if (!teamLeader) {
        companieAdd.teamLeader = '';
      }

      return { user: user, companie: companieAdd };
    } catch (error: any) {
      return error;
    }
  },
  removeCompanie: async (_: any, { id }: { id: string }) => {
    try {
      const companie = await Companies.findOne({ where: { id } });
      if (!companie) {
        throw new Error('companieNotFound');
      }

      const user = await Users.findOne({ where: { id: companie.idUser } });
      if (!user) {
        throw new Error('userNotFound');
      }

      await companie.destroy();
      await user.destroy();

      return true;
    } catch (error: any) {
      return error;
    }
  },
  updateCompanie: async (
    _: any,
    {
      id,
      name,
      lastName,
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
    }: IUpdateCompanie,
  ) => {
    try {
      const companie = await Companies.findOne({ where: { id } });
      if (!companie) {
        throw new Error('companieNotFound');
      }

      const userCompanie = await Users.findOne({
        where: { id: companie.idUser },
      });
      if (!userCompanie) {
        throw new Error('userNotFound');
      }

      if (teamLeader) {
        const verifyTeamLeader = await TeamLeader.findOne({
          where: { id: teamLeader },
        });
        if (!verifyTeamLeader) {
          throw new Error('teamLeaderNotFound');
        }
      }

      const user = await userCompanie.update({
        name,
        lastName,
        phone,
        status,
      });

      let companieAdd = null;

      try {
        companieAdd = await companie.update({
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

          ...(teamLeader ? { teamLeader } : {}),
          ...(idInterestSkills ? { idInterestSkills } : {}),
        });
      } catch (error: any) {
        user.destroy();
      }

      if (!companieAdd || !companieAdd.id) {
        throw new Error('companieNotUpdate');
      }

      return { user: user, companie: companieAdd };
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
