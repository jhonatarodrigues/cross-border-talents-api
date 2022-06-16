import bcrypt from 'bcryptjs';
import { ContextParameters } from 'graphql-yoga/dist/types';
import jsonwebtoken from 'jsonwebtoken';
import Moment from 'moment';
import { Op } from 'sequelize';

import SendMail from '../functions/sendMail';
import Candidate from '../models/candidate';
import InterestSkills from '../models/intrestSkills';
import Recruiter from '../models/recruiter';
import TeamLeader from '../models/teamLeader';
import Users from '../models/users';

interface ICreateCandidate {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  status: boolean;

  profilePicture: string;
  socialMedia: string;
  birthDate: string;
  country: string;
  gender: string;
  nativeLanguage: string;
  cvUpload: string;
  allowTalentPool: boolean;
  allowContactMe: boolean;
  privacityPolicy: boolean;
  englishLevel: string;
  observations: string;

  recruiter: string;
  teamLeader: string;
  idInterestSkills: string;
}

interface IUpdateCandidate extends ICreateCandidate {
  id: string;
}

const Query = {
  candidates: async (
    _: any,
    {
      candidate,
      department,
      recruiter,
      teamLeader,
      search,
    }: {
      candidate: string;
      department: string;
      recruiter: string;
      teamLeader: string;
      search: string;
    },
  ) => {
    let whereUser = {};

    if (search) {
      whereUser = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    const db = await Candidate.findAll({
      include: [
        {
          model: Users,
          required: true,
          as: 'user',
          where: whereUser,
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
          model: Recruiter,
          required: false,
          as: 'userRecruiter',
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
        ...(department ? { idInterestSkills: department } : {}),
        ...(recruiter ? { recruiter: recruiter } : {}),
        ...(candidate ? { id: candidate } : {}),
        ...(teamLeader ? { teamLeader: teamLeader } : {}),
      },
    });

    return db;
  },
  candidate: (_: any, { id }: { id: string }) => {
    if (!id) {
      throw new Error('companieIdNotFound');
    }

    const db = Candidate.findOne({
      where: { id },
      include: [
        {
          model: Users,
          required: false,
          as: 'user',
        },
        {
          model: Users,
          required: false,
          as: 'userTeamLeader',
        },
        {
          model: Users,
          required: false,
          as: 'userRecruiter',
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
  searchCandidates: async (
    _: any,
    {
      page,
      itensPerPage,
      search = '',
    }: { page: number; itensPerPage: number; search: string },
  ) => {
    const offset = page ? (page - 1) * itensPerPage : undefined;
    const where = {};
    let whereUser = {};

    if (search) {
      whereUser = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    const countCandidate = await Candidate.findAndCountAll({
      include: [
        {
          model: Users,
          required: false,
          as: 'user',
          where: whereUser,
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
          model: Recruiter,
          required: false,
          as: 'userRecruiter',
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
      where,
    });

    return {
      candidates: countCandidate.rows,
      infoPage: {
        currentPage: page,
        maxPage: Math.ceil(countCandidate.count / itensPerPage),
      },
      numberAllCandidates: countCandidate.count,
    };
  },
};

const Mutation = {
  createCandidate: async (
    _: any,
    {
      name,
      lastName,
      email,
      phone,
      status,

      profilePicture,
      socialMedia,
      birthDate,
      country,
      gender,
      nativeLanguage,
      cvUpload,
      allowTalentPool,
      allowContactMe,
      privacityPolicy,
      englishLevel,
      observations,

      recruiter,
      teamLeader,
      idInterestSkills,
    }: ICreateCandidate,
  ) => {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const newBirthDate = Moment(birthDate).format('YYYY-MM-DD');
    if (birthDate && newBirthDate === 'Invalid date') {
      return new Error('invalidDate');
    }

    try {
      const verifyUser = await Users.findOne({ where: { email } });
      if (verifyUser && verifyUser?.id) {
        throw new Error('candidateExists');
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
        accessLevel: 5,
        password: hashedPassword,
      });

      if (!user.id) {
        throw new Error('norCreateuser');
      }

      const candidateAdd = await Candidate.create({
        idUser: user.id,
        profilePicture,
        socialMedia,
        birthDate: newBirthDate,
        country,
        gender,
        nativeLanguage,
        cvUpload,
        allowTalentPool,
        allowContactMe,
        privacityPolicy,
        englishLevel,
        observations,

        recruiter,
        teamLeader,
        idInterestSkills,
      });

      if (!candidateAdd.id) {
        throw new Error('candidateNotCreate');
      }

      if (allowTalentPool && user.id && candidateAdd.id) {
        const token = await jsonwebtoken.sign(
          { id: user.id, email: user.email, idCandidate: candidateAdd.id },
          String(process.env.JWT_SECRET),
          { expiresIn: '7d' },
        );

        const mail = await SendMail({
          to: user.email,
          subject: 'Welcome to Talent Pool',
          text: 'Welcome to Talent Pool',
          html: `
          <h1>Welcome to Talent Pool</h1>
          <p>
          to register in the talent pool, access the link
          </p>
          <a href="http://cbtalents-com.cloud3.cloubox.com.br/registerTalentPool/${token}">
          http://cbtalents-com.cloud3.cloubox.com.br/registerTalentPool/${token}
          </a>
          `,
        });

        console.log('\n\n\n\n\n mail', mail, token);
      }

      return { user: user, candidate: candidateAdd };
    } catch (error: any) {
      return error;
    }
  },
  removeCandidate: async (_: any, { id }: { id: string }) => {
    try {
      const candidate = await Candidate.findOne({ where: { id } });
      if (!candidate) {
        throw new Error('candidateNotFound');
      }

      const user = await Users.findOne({ where: { id: candidate.idUser } });
      if (!user) {
        throw new Error('userNotFound');
      }

      await candidate.destroy().catch((err: any) => {
        if (err.message.indexOf('foreign key constraint fails') > -1) {
          throw new Error('candidateHasRelations');
        }
        throw new Error(err);
      });

      await user.destroy().catch((err: any) => {
        if (err.message.indexOf('foreign key constraint fails') > -1) {
          throw new Error('candidateHasRelations');
        }
        throw new Error(err);
      });

      return true;
    } catch (error: any) {
      console.log('\n\n\n\n error', error.info);
      return error;
    }
  },
  updateCandidate: async (
    _: any,
    {
      id,
      name,
      lastName,
      phone,
      status,

      profilePicture,
      socialMedia,
      birthDate,
      country,
      gender,
      nativeLanguage,
      cvUpload,
      allowTalentPool,
      allowContactMe,
      privacityPolicy,
      englishLevel,
      observations,

      recruiter,
      teamLeader,
      idInterestSkills,
    }: IUpdateCandidate,
  ) => {
    const newBirthDate = Moment(birthDate).format('YYYY-MM-DD');
    if (birthDate && newBirthDate === 'Invalid date') {
      return new Error('invalidDate');
    }

    try {
      const candidate = await Candidate.findOne({ where: { id } });
      if (!candidate) {
        throw new Error('candidateNotFound');
      }

      const userCandidate = await Users.findOne({
        where: { id: candidate.idUser },
      });
      if (!userCandidate) {
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

      const user = await userCandidate.update({
        name,
        lastName,
        phone,
        status,
      });

      const candidateAdd = await candidate.update({
        idUser: user.id,
        profilePicture,
        socialMedia,
        birthDate: newBirthDate,
        country,
        gender,
        nativeLanguage,
        cvUpload,
        allowTalentPool,
        allowContactMe,
        privacityPolicy,
        englishLevel,
        observations,

        recruiter,
        teamLeader,
        idInterestSkills,
      });

      return { user: user, candidate: candidateAdd };
    } catch (error: any) {
      return error;
    }
  },
  addTeamLeader: async (
    _: any,
    { id }: { id: string },
    { request }: ContextParameters,
  ) => {
    try {
      const token = request.get('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return;
      }
      const { id: idTeamLeader } = jsonwebtoken.verify(
        token,
        String(process.env.JWT_SECRET),
      ) as {
        id: string;
      };

      const teamLeader = await TeamLeader.findOne({
        where: { idUser: idTeamLeader },
      });

      if (!teamLeader) {
        throw new Error('teamLeaderNotFound');
      }

      const candidate = await Candidate.findOne({ where: { id } });

      if (!candidate) {
        throw new Error('candidateNotFound');
      }

      candidate.update({ teamLeader: teamLeader.id });
      return true;
    } catch (error) {
      return error;
    }
  },
};

export { Query, Mutation };
