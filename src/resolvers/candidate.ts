import bcrypt from 'bcryptjs';
// --
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';
import { ContextParameters } from 'graphql-yoga/dist/types';
import jsonwebtoken from 'jsonwebtoken';
import Moment from 'moment';
import { userInfo } from 'os';
import Sequelize, { Op, where } from 'sequelize';

import SendMail from '../functions/sendMail';
import Candidate from '../models/candidate';
import InterestSkills from '../models/intrestSkills';
import Recruiter from '../models/recruiter';
import TeamLeader from '../models/teamLeader';
import Users from '../models/users';
import { CheckMail, GeneratedPassword } from '../util/functions';

interface ICreateCandidate {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  status: boolean;

  profilePicture: string;
  socialMedia: string;
  birthDate: string;
  country: string;
  gender: string;
  nativeLanguage: string;
  cvUpload: string;
  allowTalentPool: boolean;
  allowContactMe: boolean;
  privacityPolicy: boolean;
  englishLevel: string;
  observations: string;

  recruiter: string;
  teamLeader: string;
  idInterestSkills: string;
  talentPoolVerify: boolean;
}

interface IUpdateCandidate extends ICreateCandidate {
  id: string;
}

const Query = {
  candidates: async (
    _: any,
    {
      candidate,
      department,
      recruiter,
      teamLeader,
      search,
    }: {
      candidate: string;
      department: string;
      recruiter: string;
      teamLeader: string;
      search: string;
    },
  ) => {
    let whereUser = {};

    if (search) {
      whereUser = {
        [Op.or]: [
          {
            namesQuery: Sequelize.where(
              Sequelize.fn(
                'concat',
                Sequelize.col('name'),
                ' ',
                Sequelize.col('lastName'),
              ),
              {
                [Sequelize.Op.like]: `%${search.replace(' ', '%')}%`,
              },
            ),
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    console.log('\n\n\n search', search);

    let whereRecruiter = {};

    if (recruiter) {
      whereRecruiter = {
        // [Op.or]: [{ recruiter: recruiter }, { recruiter: null }],
        [Op.or]: [{ recruiter: recruiter }],
      };
    }
    // if (!recruiter && !search) {
    //   whereRecruiter = { recruiter: null };
    // }

    let whereTeamLeader = {};

    if (teamLeader) {
      whereTeamLeader = {
        // [Op.or]: [{ teamLeader: teamLeader }, { teamLeader: null }],
        [Op.or]: [{ teamLeader: teamLeader }],
      };
    }
    // if (!teamLeader && !search) {
    //   whereTeamLeader = { teamLeader: null };
    // }

    const db = await Candidate.findAll({
      include: [
        {
          model: Users,
          required: true,
          as: 'user',
          where: whereUser,
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
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
      order: [['id', 'DESC']],
      where: {
        recruiter: null,
        teamLeader: null,
      },
      limit: 10,
    });

    const db2 = await Candidate.findAll({
      include: [
        {
          model: Users,
          required: true,
          as: 'user',
          where: whereUser,
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
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
      order: [['id', 'DESC']],
      where: {
        ...(department ? { idInterestSkills: department } : {}),
        ...(candidate ? { idUser: candidate } : {}),

        ...whereRecruiter,
        ...whereTeamLeader,
      },
      limit: 990,
    });

    return [...db, ...db2];
  },
  candidate: (_: any, { id }: { id: string }) => {
    if (!id) {
      throw new Error('companieIdNotFound');
    }

    const db = Candidate.findOne({
      where: { id },
      include: [
        {
          model: Users,
          required: false,
          as: 'user',
        },
        {
          model: Users,
          required: false,
          as: 'userTeamLeader',
        },
        {
          model: Users,
          required: false,
          as: 'userRecruiter',
        },
        {
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
    });

    return db;
  },
  searchCandidates: async (
    _: any,
    {
      page,
      itensPerPage,
      search = '',
    }: { page: number; itensPerPage: number; search: string },
  ) => {
    const offset = page ? (page - 1) * itensPerPage : undefined;
    const where = {};
    let whereUser = {};

    if (search) {
      whereUser = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    const countCandidate = await Candidate.findAndCountAll({
      include: [
        {
          model: Users,
          required: false,
          as: 'user',
          where: whereUser,
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
          model: InterestSkills,
          required: false,
          as: 'interestSkills',
        },
      ],
      order: [['id', 'DESC']],
      where,
    });

    return {
      candidates: countCandidate.rows,
      infoPage: {
        currentPage: page,
        maxPage: Math.ceil(countCandidate.count / itensPerPage),
      },
      numberAllCandidates: countCandidate.count,
    };
  },
};

const Mutation = {
  createCandidate: async (
    _: any,
    {
      name,
      lastName,
      email,
      phone,
      status,

      profilePicture,
      socialMedia,
      birthDate,
      country,
      gender,
      nativeLanguage,
      cvUpload,
      allowTalentPool,
      allowContactMe,
      privacityPolicy,
      englishLevel,
      observations,

      recruiter,
      teamLeader,
      idInterestSkills,
      talentPoolVerify,
    }: ICreateCandidate,
    { request }: ContextParameters,
  ) => {
    const generatePassword = GeneratedPassword(8) || '';
    const hashedPassword = await bcrypt.hash(generatePassword, 10);
    let newBirthDate = '';

    if (birthDate) {
      newBirthDate = Moment(birthDate).format('YYYY-MM-DD');
      if (birthDate && newBirthDate === 'Invalid date') {
        return new Error('invalidDate');
      }
    }

    try {
      const verifyUser = await Users.findOne({ where: { email } });
      if (verifyUser && verifyUser?.id) {
        throw new Error('candidateExists');
      }

      if (teamLeader) {
        const verifyTeamLeader = await TeamLeader.findOne({
          where: { id: teamLeader },
        });
        if (!verifyTeamLeader) {
          throw new Error('teamLeaderNotFound');
        }
      }

      const user = await Users.create({
        name,
        lastName,
        email: email,
        phone,
        status,
        accessLevel: 5,
        password: hashedPassword,
      });

      if (!user.id) {
        throw new Error('notCreateUser');
      }

      let candidateAdd = null;
      try {
        candidateAdd = await Candidate.create({
          idUser: user.id,
          profilePicture,
          socialMedia,
          ...(birthDate ? { birthDate: newBirthDate } : {}),
          country,
          gender,
          nativeLanguage,
          cvUpload,
          allowTalentPool,
          allowContactMe,
          privacityPolicy,
          englishLevel,
          observations,

          ...(teamLeader ? { teamLeader } : {}),
          ...(recruiter ? { recruiter } : {}),
          idInterestSkills,

          talentPoolVerify,
        });
      } catch (error) {
        user.destroy();
      }

      if (!candidateAdd || !candidateAdd.id) {
        throw new Error('candidateNotCreate');
      }

      const tokenBearer =
        request.get('Authorization')?.replace('Bearer ', '') || '';

      const { id, accessLevel } = jsonwebtoken.verify(
        tokenBearer,
        String(process.env.JWT_SECRET),
      ) as { id: string; accessLevel: number };

      if (
        user.id &&
        candidateAdd.id &&
        (accessLevel === 2 || accessLevel === 3)
      ) {
        const token = await jsonwebtoken.sign(
          { id: user.id, email: user.email, idCandidate: candidateAdd.id },
          String(process.env.JWT_SECRET),
          { expiresIn: '7d' },
        );

        const em01 = `
        <h2 style="font-family: Arial, Helvetica, sans-serif; color: #212F53; font-size: 48px;">Hello ${user.name} ${user.lastName},</h2>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">You recently created an account for our website to follow the job opportunities we have.</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Please note that creating an account does not guarantee applications for job openings. Each job application must be done by the candidate on our website.</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Your registration may be subject to a check and will still require final validation by our team.</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Best regards,</p>
        `;

        const mail = await SendMail({
          to: user.email,
          cc: 'backup@cbtalents.com, info@cbtalents.com',
          subject: '📬 Cross Border Talents | Registration to our database',
          text: '📬 Cross Border Talents | Registration to our database',
          html: em01,
        });

        // if(allowTalentPool) {

        // }

        // const mail = await SendMail({
        //   to: user.email,
        //   subject: '👏Welcome to the Team | Approached Candidates',
        //   text: '👏Welcome to the Team | Approached Candidates',
        //   html: `

        //   <h2 style="font-family: Arial, Helvetica, sans-serif; color: #212F53; font-size: 48px;">Hello ${user.name} ${user.lastName},</h2>
        //   <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">After this step, you are part of our amazing team of international recruiters. To enter the Approached Candidates, you just need to follow the steps below:</p>
        //   <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">How to start</p>
        //   <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">1. Enter the DataBase here [insert link]\n
        //   Login using your cbt email address\n
        //   Your password is <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 25px; font-weight: bold;">${generatePassword}</p>
        //   </p>

        //   <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">2. Change your password\n
        //   You can follow the steps here.</p>

        //   <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">3. Start registering your candidates\n
        //   You can follow the steps here.</p>

        //   <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">
        //     <a href="http://cbtalents-com.cloud3.cloubox.com.br/registerTalentPool/${token}">
        //     http://cbtalents-com.cloud3.cloubox.com.br/registerTalentPool/${token}
        //     </a>
        //   </p>

        //   `,
        // });

        console.log('\n\n\n\n\n mail', mail, token);
      }

      if (
        (accessLevel === 2 || accessLevel === 3) &&
        user.id &&
        candidateAdd.id
      ) {
        const userTeamLeader = await Users.findOne({
          where: { id: id },
        });

        const em05 = `
        Hello ${userTeamLeader?.name} ${userTeamLeader?.lastName},
 
        This is an email confirmation sent via the Approached Candidates.
        The following candidate was successfully added to our Approached Candidates under your username:
        Name: ${name}
        Last name: ${lastName}
        Email: ${email}
        
        
        Best regards,
        Cross Border Talents
         
        
        `;

        if (userTeamLeader && userTeamLeader?.email) {
          const mail3 = await SendMail({
            to: userTeamLeader?.email,
            cc: `backup@cbtalents.com`,
            subject: '🟢 Approached candidate | success',
            text: '🟢 Approached candidate | success',
            html: em05,
          });

          console.log('mail3 --', mail3);
        }
      }

      if ((accessLevel === 2 || accessLevel === 3) && allowTalentPool) {
        const token = await jsonwebtoken.sign(
          { id: user.id, email: user.email, idCandidate: candidateAdd.id },
          String(process.env.JWT_SECRET),
          { expiresIn: '7d' },
        );

        const em03 = `
        
        <h2 style="font-family: Arial, Helvetica, sans-serif; color: #212F53; font-size: 48px;">Hello ${user.name} ${user.lastName},</h2>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">You were recently chosen by our team of international recruiters to join our Talent Pool, and no further action is required.</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Please keep in mind that this action does not make use of any of your personal information. CBTalents Talent Pool abides by <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj">GDPR regulations</a>, and your personal information remains yours.</p>

          <br />
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">What are the benefits?</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">• Companies receive no personal information (Blind CVs)</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">• Companies may hire you based on your professional abilities</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">• You you be listed as a Top Candidate </p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">• Our international recruiters will be present at all stages of the recruitment process.</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">• Companies can select anyone regardless of gender, race, and other diversity groups</p>
        <br />
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">⚠️ Please keep in mind that this action does not guarantee job applications.</p>
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">⚠️<a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj">GDPR rules</a> & <a href="https://blog-cbtalents-com.cloud3.cloubox.com.br/privacy-policy/">Privacy Policy</a></p>
        <br />
        <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">Best regards,</p>
          

           <p style="font-family: Arial, Helvetica, sans-serif; color: #808080; font-size: 22px;">
            <a href="http://cbtalents-com.cloud3.cloubox.com.br/registerTalentPool/${token}">
            http://cbtalents-com.cloud3.cloubox.com.br/registerTalentPool/${token}
             </a>
           </p>

        `;

        const userTeamLeader = await Users.findOne({
          where: { id: id },
        });

        const mail2 = await SendMail({
          to: user.email,
          cc: `info@cbtalents.com,backup@cbtalents.com,${userTeamLeader?.email}`,
          subject:
            '✨Congratulations you are a Top candidate | CBT Talent Pool',
          text: '✨Congratulations you are a Top candidate | CBT Talent Pool',
          html: em03,
        });

        console.log('mail2 --', mail2);
      }

      return { user: user, candidate: candidateAdd };
    } catch (error: any) {
      return error;
    }
  },
  removeCandidate: async (_: any, { id }: { id: string }) => {
    try {
      const candidate = await Candidate.findOne({ where: { id } });
      if (!candidate) {
        throw new Error('candidateNotFound');
      }

      const user = await Users.findOne({ where: { id: candidate.idUser } });
      if (!user) {
        throw new Error('userNotFound');
      }

      await candidate.destroy().catch((err: any) => {
        if (err.message.indexOf('foreign key constraint fails') > -1) {
          throw new Error('candidateHasRelations');
        }
        throw new Error(err);
      });

      await user.destroy().catch((err: any) => {
        if (err.message.indexOf('foreign key constraint fails') > -1) {
          throw new Error('candidateHasRelations');
        }
        throw new Error(err);
      });

      return true;
    } catch (error: any) {
      console.log('\n\n\n\n error', error.info);
      return error;
    }
  },
  updateCandidate: async (
    _: any,
    {
      id,
      name,
      lastName,
      phone,
      status,

      profilePicture,
      socialMedia,
      birthDate,
      country,
      gender,
      nativeLanguage,
      cvUpload,
      allowTalentPool,
      allowContactMe,
      privacityPolicy,
      englishLevel,
      observations,

      recruiter,
      teamLeader,
      idInterestSkills,
      talentPoolVerify,
    }: IUpdateCandidate,
  ) => {
    const newBirthDate = Moment(birthDate).format('YYYY-MM-DD');
    if (birthDate && newBirthDate === 'Invalid date') {
      return new Error('invalidDate');
    }

    try {
      const candidate = await Candidate.findOne({ where: { id } });
      if (!candidate) {
        throw new Error('candidateNotFound');
      }

      const userCandidate = await Users.findOne({
        where: { id: candidate.idUser },
      });
      if (!userCandidate) {
        throw new Error('userNotFound');
      }

      if (teamLeader) {
        const verifyTeamLeader = await TeamLeader.findOne({
          where: { id: teamLeader },
        });
        if (!verifyTeamLeader) {
          throw new Error('teamLeaderNotFound');
        }
      }

      const user = await userCandidate.update({
        name,
        lastName,
        phone,
        status,
      });

      const candidateAdd = await candidate.update({
        idUser: user.id,
        profilePicture,
        socialMedia,
        birthDate: newBirthDate,
        country,
        gender,
        nativeLanguage,
        cvUpload,
        allowTalentPool,
        allowContactMe,
        privacityPolicy,
        englishLevel,
        observations,

        teamLeader: teamLeader || null,
        recruiter: recruiter || null,
        idInterestSkills,

        talentPoolVerify,
      });

      return { user: user, candidate: candidateAdd };
    } catch (error: any) {
      return error;
    }
  },
  addTeamLeader: async (
    _: any,
    { id }: { id: string },
    { request }: ContextParameters,
  ) => {
    try {
      const token = request.get('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return;
      }
      const { id: idTeamLeader } = jsonwebtoken.verify(
        token,
        String(process.env.JWT_SECRET),
      ) as {
        id: string;
      };

      const teamLeader = await TeamLeader.findOne({
        where: { idUser: idTeamLeader },
      });

      if (!teamLeader) {
        throw new Error('teamLeaderNotFound');
      }

      const candidate = await Candidate.findOne({ where: { id } });

      if (!candidate) {
        throw new Error('candidateNotFound');
      }

      candidate.update({ teamLeader: teamLeader.id });
      return true;
    } catch (error) {
      return error;
    }
  },
  addRecruiter: async (
    _: any,
    { id }: { id: string },
    { request }: ContextParameters,
  ) => {
    try {
      const token = request.get('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return;
      }
      const { id: idTeamLeader } = jsonwebtoken.verify(
        token,
        String(process.env.JWT_SECRET),
      ) as {
        id: string;
      };

      const teamLeader = await Recruiter.findOne({
        where: { idUser: idTeamLeader },
      });

      if (!teamLeader) {
        throw new Error('recruiterNotFound');
      }

      const candidate = await Candidate.findOne({ where: { id } });

      if (!candidate) {
        throw new Error('candidateNotFound');
      }

      candidate.update({ recruiter: teamLeader.id });
      return true;
    } catch (error) {
      return error;
    }
  },

  importCandidateFromCSV: async () => {
    const results: any = [];
    let error = 0;
    let success = 0;
    let total = 0;
    let registered = 0;
    let notMail = 0;
    const fileName = '2022.csv';

    const createCSV = createObjectCsvWriter;

    const csvWrited = createCSV({
      path: 'src/data/error-' + fileName,
      header: [
        { id: 'name', title: 'NAME' },
        { id: 'observations', title: 'OBSERVATIONS' },
        { id: 'user', title: 'USER' },
      ],
    });

    const records: any[] = [];

    await fs
      .createReadStream('src/data/' + fileName)
      .pipe(
        csv({
          separator: ';',
        }),
      )
      .on('data', (data: any) => results.push(data))
      .on('end', async () => {
        for (const candidate of results) {
          const observations = candidate.Observations;
          const splitObservations =
            observations && observations.indexOf('') > -1
              ? observations.split(' ')
              : [];

          let email = '';

          if (splitObservations && splitObservations.length > 0) {
            splitObservations.forEach((observation: string) => {
              if (!email && CheckMail(observation) === true) {
                email = observation;
              }
            });
          }

          if (email) {
            const generatePassword = GeneratedPassword(8) || '';
            const hashedPassword = await bcrypt.hash(generatePassword, 10);

            const checkUser = await Users.findOne({
              where: { email },
            });
            if (!checkUser) {
              const user = await Users.create({
                name: candidate.Name,
                email,
                status: 1,
                accessLevel: 5,
                password: hashedPassword,
              });

              if (!user.id) {
                error++;
              }

              let candidateAdd = null;
              try {
                candidateAdd = await Candidate.create({
                  idUser: user.id,

                  observations: candidate.Observations,

                  country: '',
                  profilePicture: '',
                  socialMedia: '',
                  gender: '',
                  nativeLanguage: '',
                  allowTalentPool: false,
                  allowContactMe: false,
                  privacityPolicy: true,
                  englishLevel: '',
                  talentPoolVerify: false,
                });

                success++;
              } catch {
                user.destroy();
                error++;
              }
            } else {
              registered++;
            }
          } else {
            const item = {
              name: candidate.Name,
              observations: candidate.Observations,
              user: candidate.User,
            };

            records.push(item);

            notMail++;
          }
          total++;
        }

        csvWrited
          .writeRecords(records) // returns a promise
          .then(() => {
            console.log('...Done');
          });

        console.log('\n\n\n\n\n --- end ---- \n\n\n', {
          Success: success,
          Error: error,
          Total: total,
          Registered: registered,
          'Not Mail': notMail,
        });
      });

    return `
      Success: ${success}\n
      Error: ${error}\n
      Total: ${total}\n
      Registered: ${registered}\n
      Not Mail: ${notMail}\n    
    `;
  },
};

export { Query, Mutation };
