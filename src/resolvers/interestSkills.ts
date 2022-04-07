import InterestSkills from '../models/intrestSkills';

interface ICreateInterestSkills {
  name: string;
}

const Query = {
  interestSkills: () => InterestSkills.findAll({ order: [['id', 'Desc']] }),
  interestSkill: (_: any, { id }: { id: string }) =>
    InterestSkills.findByPk(id),
};

const Mutation = {
  createInterestSkill: async (_: any, { name }: ICreateInterestSkills) => {
    try {
      const verifyUser = await InterestSkills.findOne({ where: { name } });
      if (verifyUser && verifyUser.id) {
        throw new Error('interestSkillsExists');
      }

      const returnInterest = await InterestSkills.create({
        name,
      });

      return returnInterest;
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
