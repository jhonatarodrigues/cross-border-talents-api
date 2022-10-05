import { ContextParameters } from 'graphql-yoga/dist/types';
import jwt from 'jsonwebtoken';

import SendMail from '../functions/sendMail';
import Candidate from '../models/candidate';
import Companies from '../models/companies';
import TalentPool from '../models/talentPool';
import TalentPoolInterest from '../models/talentPoolInterest';
import TeamLeader from '../models/teamLeader';
import Users from '../models/users';

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

      if (talentPoolInterest) {
        const user = await Users.findOne({
          where: { id },
        });
        const company = await Companies.findOne({
          where: { id },
        });
        const talentPool = await TalentPool.findOne({
          where: { id: idTalentPool },
        });

        const candidate = await Candidate.findOne({
          where: { id: talentPool?.idCandidate },
        });

        const userIdTeamLeader = await TeamLeader.findOne({
          where: { id: candidate?.teamLeader },
        });

        const teamLeaderUser = await Users.findOne({
          where: { id: userIdTeamLeader?.idUser },
        });

        if (user?.email) {
          SendMail({
            to: teamLeaderUser?.email || '',
            subject: '🚀Talent Pool for Companies | Requesting candidate',
            text: '',
            cc: 'backup@cbtalents.com',
            html: `


              <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Hello,</p>
              <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">This is a request from ${company?.companyName} ${company?.companyName}, sent via the Approached Candidates.</p>
              <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">This company would like to interview/hire the candidate #${talentPool?.user.id} ${talentPool?.user.email}.</p>
              <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">To accept this request, click in the button below:</p>
              <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Accept</p>
              <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Thanks,</p>
              <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Approached Candidates on behalf of ${talentPool?.user.name} ${talentPool?.user.lastName}</p>

            `,
          });
        }
      }

      return talentPoolInterest;
    } catch (error) {
      return error;
    }
  },
};

export { Query, Mutation };
