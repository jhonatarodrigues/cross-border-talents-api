import { ContextParameters } from 'graphql-yoga/dist/types';
import jwt from 'jsonwebtoken';

import TalentPoolInterest from '../models/talentPoolInterest';

interface ITalentPoolInterest {
  idTalentPool: number;
}

const Query = {
  talentPoolInterests: async (
    _: any,
    { idTalentPool }: ITalentPoolInterest,
  ) => {
    const talentPoolInterest = await TalentPoolInterest.findOne({
      where: {
        idTalentPool,
        // idCompany,
      },
    });

    return !!talentPoolInterest;
  },
};

const Mutation = {
  addTalentPoolInterest: async (
    _: any,
    { idTalentPool }: ITalentPoolInterest,
    { request }: ContextParameters,
  ) => {
    try {
      const token = request.get('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return;
      }

      const { id } = jwt.verify(token, String(process.env.JWT_SECRET)) as {
        id: string;
      };

      const verify = await TalentPoolInterest.findOne({
        where: { idTalentPool, idCompany: id },
      });

      if (verify) {
        throw new Error('talentPoolInterestExists');
      }

      const talentPoolInterest = await TalentPoolInterest.create({
        idTalentPool,
        idCompany: id,
      });

      return talentPoolInterest;
    } catch (error) {
      return error;
    }
  },
};

export { Query, Mutation };
