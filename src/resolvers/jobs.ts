import InterestSkills from '../models/intrestSkills';
import Jobs from '../models/jobs';

interface ICreateJobs {
  idInterestSkills: string;
  jobTitle: string;
  level: string;
  country: string;
  description: string;
  date: Date;
}

interface IUpdateJobs extends ICreateJobs {
  id: string;
}

const Query = {
  jobs: () =>
    Jobs.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
    }),
  job: (_: any, { id }: { id: string }) => Jobs.findByPk(id),
};

const Mutation = {
  createJobs: async (
    _: any,
    {
      idInterestSkills,
      jobTitle,
      level,
      country,
      date,
      description,
    }: ICreateJobs,
  ) => {
    try {
      const jobs = await Jobs.create({
        idInterestSkills,
        jobTitle,
        level,
        country,
        description,
        date,
      });

      return jobs;
    } catch (error: any) {
      return error;
    }
  },
  removeJobs: async (_: any, { id }: { id: string }) => {
    try {
      const jobs = await Jobs.findByPk(id);

      if (!jobs) {
        return false;
      }

      await jobs.destroy();

      return true;
    } catch (error: any) {
      return error;
    }
  },
  updateJobs: async (
    _: any,
    {
      id,
      idInterestSkills,
      jobTitle,
      level,
      country,
      date,
      description,
    }: IUpdateJobs,
  ) => {
    try {
      const jobsUpdate = await Jobs.findByPk(id);

      if (!jobsUpdate) {
        throw new Error('jobNotFound');
      }

      const jobs = await jobsUpdate.update({
        idInterestSkills,
        jobTitle,
        level,
        country,
        description,
        date,
      });

      return jobs;
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
