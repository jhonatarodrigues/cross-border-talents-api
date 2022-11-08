import { Op } from 'sequelize';

import SendMail from '../functions/sendMail';
import InterestSkills from '../models/intrestSkills';
import Jobs from '../models/jobs';
import Recruiter from '../models/recruiter';
import TeamLeader from '../models/teamLeader';
import Users from '../models/users';

interface ICreateJobs {
  idInterestSkills: string;
  jobTitle: string;
  level: string;
  country: string;
  description: string;
  date: string;
  requirements: string;
  benefits: string;
  recruiter: string;
  teamLeader: string;
}

interface IApplyNow {
  idJob: string;
  name: string;
  email: string;
  cv: string;
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
      ],
    }),
  job: (_: any, { id }: { id: string }) => Jobs.findByPk(id),
  jobsSearch: async (
    _: any,
    {
      page,
      itensPerPage,
      search,

      department,
      country,
      region,
      typeContract,
      experienceLevel,
      language,
    }: {
      page: number;
      itensPerPage: number;
      search: string;
      department: string;
      country: string;
      region: string;
      typeContract: string;
      experienceLevel: string;
      language: string;
    },
  ) => {
    const offset = page ? (page - 1) * itensPerPage : undefined;

    let where = {};
    if (
      search ||
      department ||
      country ||
      region ||
      typeContract ||
      experienceLevel ||
      language
    ) {
      where = {
        [Op.and]: [
          search ? { jobTitle: { [Op.like]: `%${search}%` } } : {},
          search ? { description: { [Op.like]: `%${search}%` } } : {},
          department
            ? { idInterestSkills: { [Op.like]: `%${department || ''}%` } }
            : {},
          country ? { country: country } : {},
          experienceLevel ? { level: experienceLevel } : {},
        ],
      };
    }

    const infoPage = await Jobs.findAndCountAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
      where,
      offset,
      limit: itensPerPage,
    });

    return {
      jobs: infoPage.rows,
      infoPage: {
        currentPage: page,
        maxPage: Math.ceil(infoPage.count / itensPerPage),
      },
      numberAllCandidates: infoPage.count,
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
      requirements,
      benefits,
      recruiter,
      teamLeader,
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
        requirements,
        benefits,
        ...(recruiter ? { recruiter } : {}),
        ...(teamLeader ? { teamLeader } : {}),
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
      requirements,
      benefits,
      recruiter,
      teamLeader,
    }: IUpdateJobs,
  ) => {
    try {
      const jobsUpdate = await Jobs.findByPk(id);

      if (!jobsUpdate) {
        throw new Error('jobNotFound');
      }

      console.log('aaa --', teamLeader);

      const jobs = await jobsUpdate.update({
        idInterestSkills,
        jobTitle,
        level,
        country,
        description,
        date,
        requirements,
        benefits,
        ...(recruiter ? { recruiter } : {}),
        ...(teamLeader ? { teamLeader } : {}),
      });

      return jobs;
    } catch (error: any) {
      return error;
    }
  },
  applyNow: async (_: any, { idJob, name, email, cv }: IApplyNow) => {
    try {
      const job = await Jobs.findOne({
        where: {
          id: idJob,
        },
      });

      let email = 'info@cbtalents.com';

      if (job && job?.recruiter) {
        const recruiter = await Recruiter.findOne({
          include: [
            {
              model: Users,
              required: true,
              as: 'user',
            },
          ],
          where: { id: job?.recruiter },
        });

        if (recruiter && recruiter.user?.email) {
          email += ',' + recruiter.user?.email;
        }
      }

      const mail = await SendMail({
        to: email,
        bcc: 'jhonata.a.r@hotmail.com',
        subject: job?.jobTitle + ' - ' + name,
        text: 'Apply Now Job',
        html: `
          <h2 style="font-family: Arial, Helvetica, sans-serif; color: #212F53; font-size: 48px;">Job - ${job?.jobTitle}</h2>
          <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Name: ${name}</p>
          <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Email: ${email}</p>
          <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">CV: <a href="https://api.cbtalents.com/uploads/${cv}">https://api.cbtalents.com/uploads/${cv}</a></p>
          `,
      });

      if (mail) {
        return true;
      }
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
