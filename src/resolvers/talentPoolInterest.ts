import TalentPoolInterest from '../models/talentPoolInterest';

interface ITalentPoolInterest {
  idTalentPool: number;
  idCompany: number;
}

const Query = {
  talentPoolInterests: async (
    _: any,
    { idTalentPool, idCompany }: ITalentPoolInterest,
  ) => {
    const talentPoolInterest = await TalentPoolInterest.findOne({
      where: {
        idTalentPool,
        idCompany,
      },
    });

    return !!talentPoolInterest;
  },
};

const Mutation = {
  addTalentPoolInterest: async (
    _: any,
    { idTalentPool, idCompany }: ITalentPoolInterest,
  ) => {
    try {
      const verify = await TalentPoolInterest.findOne({
        where: { idTalentPool, idCompany },
      });

      if (verify) {
        throw new Error('talentPoolInterestExists');
      }

      const talentPoolInterest = await TalentPoolInterest.create({
        idTalentPool,
        idCompany,
      });

      return talentPoolInterest;
    } catch (error) {
      return error;
    }
  },
};

export { Query, Mutation };
