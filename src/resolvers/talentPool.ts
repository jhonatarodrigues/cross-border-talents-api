import { ContextParameters } from 'graphql-yoga/dist/types';
import jwt from 'jsonwebtoken';
import Moment from 'moment';

import Candidate from '../models/candidate';
import TalentPool from '../models/talentPool';
import TeamLeader from '../models/teamLeader';
import User from '../models/users';

interface ITalentPool {
  idCandidate: number;
  idUser: number;
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
  talentPool: async (_: any, { idUser }: { idUser: string }) => {
    const talentPools = await TalentPool.findOne({
      where: {
        idUser,
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
    { request }: ContextParameters,
  ) => {
    try {
      const talentPool = await TalentPool.findOne({ where: { idCandidate } });

      const token = request.get('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return;
      }

      const { id } = jwt.verify(token, String(process.env.JWT_SECRET)) as {
        id: string;
      };

      let dataTratada = data;
      if (!data) {
        dataTratada = Moment(new Date()).format('YYYY-MM-DD');
      }

      if (talentPool) {
        const returnTalentPool = talentPool.update({
          profile,
          observation,
          softwares,
          education,
          experience,
          languages,
          status,
          charge,
        });

        return returnTalentPool;
      } else {
        const talentPoolCreate = await TalentPool.create({
          idCandidate,
          idUser,
          idTeamLeader: id,
          data: dataTratada,
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
      }
    } catch (error) {
      return error;
    }
  },
};

export { Query, Mutation };
