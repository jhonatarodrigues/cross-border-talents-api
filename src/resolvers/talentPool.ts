import jwt from 'jsonwebtoken';

import Candidate from '../models/candidate';
import TalentPool from '../models/talentPool';
import TeamLeader from '../models/teamLeader';
import User from '../models/users';

interface ITalentPool {
  idCandidate: number;
  idUser: number;
  idTeamLeader: number;
  data: string;
  profile: string;
  observation: string;
  charge: string;
  softwares: string;
  education: string;
  experience: string;
  languages: string;
  status: boolean;
}

const Query = {
  talentPools: async () => {
    const talentPools = await TalentPool.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: Candidate,
          required: false,
          as: 'candidate',
        },
        {
          model: TeamLeader,
          required: false,
          as: 'teamLeader',
        },
        {
          model: User,
          required: false,
          as: 'user',
        },
      ],
      order: [['id', 'DESC']],
    });

    return talentPools;
  },
};

const Mutation = {
  addUserTalentPool: async (_: any, { token }: { token: string }) => {
    const tokenDecrypt = jwt.verify(token, String(process.env.JWT_SECRET));

    const { idCandidate } = tokenDecrypt as {
      id: string;
      idCandidate: string;
    };

    const candidate = await Candidate.findOne({ where: { id: idCandidate } });
    if (!candidate) {
      throw new Error('candidateNotFound');
    }

    const candidateUpdate = await candidate.update({
      talentPoolVerify: true,
    });

    if (candidateUpdate) {
      return true;
    }

    return false;
  },
  moveUserTalentPool: async (
    _: any,
    {
      idCandidate,
      idUser,
      idTeamLeader,
      data,
      profile,
      observation,
      softwares,
      charge,
      education,
      experience,
      languages,
      status,
    }: ITalentPool,
  ) => {
    try {
      const talentPool = await TalentPool.findOne({ where: { idCandidate } });

      if (talentPool) {
        return new Error('talentPoolAlreadyExists');
      }

      const talentPoolCreate = await TalentPool.create({
        idCandidate,
        idUser,
        idTeamLeader,
        data,
        profile,
        observation,
        softwares,
        education,
        experience,
        languages,
        status,
        charge,
      });

      return talentPoolCreate;
    } catch (error) {
      return error;
    }
  },
};

export { Query, Mutation };
