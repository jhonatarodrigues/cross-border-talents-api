import bcrypt from 'bcryptjs';
import Moment from 'moment';

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
  candidates: async () => {
    const db = await Candidate.findAll({
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

      return { user: user, candidate: candidateAdd };
    } catch (error: any) {
      return error;
    }
  },
  removeRecruiter: async (_: any, { id }: { id: string }) => {
    try {
      const candidate = await Candidate.findOne({ where: { id } });
      if (!candidate) {
        throw new Error('candidateNotFound');
      }

      const user = await Users.findOne({ where: { id: candidate.idUser } });
      if (!user) {
        throw new Error('userNotFound');
      }

      await candidate.destroy();
      await user.destroy();

      return true;
    } catch (error: any) {
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
};

export { Query, Mutation };
