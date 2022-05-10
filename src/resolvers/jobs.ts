import { Op } from 'sequelize';

import InterestSkills from '../models/intrestSkills';
import Jobs from '../models/jobs';

interface ICreateJobs {
  idInterestSkills: string;
  jobTitle: string;
  level: string;
  country: string;
  description: string;
  date: string;
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
  jobsSearch: async (
    _: any,
    {
      page,
      itensPerPage,
      search,
    }: { page: number; itensPerPage: number; search: string },
  ) => {
    const offset = page ? (page - 1) * itensPerPage : undefined;
    const where = search
      ? {
          [Op.or]: [
            { jobTitle: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};
    const jobs = await Jobs.findAll({
      where,
      order: [['id', 'DESC']],
      include: [
        {
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
      offset,
      limit: itensPerPage || undefined,
    });

    const infoPage = await Jobs.findAndCountAll({
      where,
      order: [['id', 'DESC']],
      include: [
        {
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
    });

    return {
      jobs,
      infoPage: {
        currentPage: page,
        maxPage: Math.ceil(infoPage.count / itensPerPage),
      },
    };
  },
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
