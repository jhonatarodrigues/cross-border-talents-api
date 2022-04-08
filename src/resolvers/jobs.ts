import bcrypt from 'bcryptjs';

import Jobs from '../models/jobs';

interface ICreateJobs {
  idInterestSkills: string;
  jobTitle: string;
  level: string;
  country: string;
  description: string;
}

const Query = {
  jobs: () => Jobs.findAll({ order: [['id', 'DESC']] }),
  job: (_: any, { id }: { id: string }) => Jobs.findByPk(id),
};

const Mutation = {
  createJobs: async (
    _: any,
    { idInterestSkills, jobTitle, level, country, description }: ICreateJobs,
  ) => {
    try {
      const jobs = await Jobs.create({
        idInterestSkills,
        jobTitle,
        level,
        country,
        description,
      });

      return jobs;
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
