import jwt from 'jsonwebtoken';

import Candidate from '../models/candidate';

const Query = {};

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
};

export { Query, Mutation };
