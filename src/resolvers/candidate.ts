import bcrypt from 'bcryptjs';
import Moment from 'moment';

import Candidate from '../models/candidate';
import InterestSkills from '../models/intrestSkills';
import Users from '../models/users';

interface ICreateCandidate {
  name: string;
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

  recruiter: string;
  teamLeader: string;
  idInterestSkills: string;
}

const Query = {
  candidates: async () => {
    const db = await Candidate.findAll({
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
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
          as: 'userRecruiter',
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
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
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
};

const Mutation = {
  createCandidate: async (
    _: any,
    {
      name,
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
        const verifyTeamLeader = await Users.findOne({
          where: { id: teamLeader, accessLevel: 2 },
        });
        if (!verifyTeamLeader) {
          throw new Error('teamLeaderNotFound');
        }
      }

      const user = await Users.create({
        name,
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

        recruiter,
        teamLeader,
        idInterestSkills,
      });

      if (!candidateAdd.id) {
        throw new Error('candidateNotCreate');
      }

      return { user: user, candidate: candidateAdd };
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
