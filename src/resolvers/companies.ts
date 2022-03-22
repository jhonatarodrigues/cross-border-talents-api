import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { finished } from 'stream';

import Recruiter from '../models/recruiter';
import Users from '../models/users';

interface ICreateCompanie {
  file: any;
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

const Query = {
  companies: async () => {
    const recruiter = await Recruiter.findAll({
      include: [
        {
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
          as: 'user',
        },
        {
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
          as: 'userTeamLeader',
        },
      ],
    });

    return recruiter;
  },
  companie: (_: any, { id }: { id: string }) => {
    if (!id) {
      throw new Error('recruiterIdNotFound');
    }

    const recruiter = Recruiter.findOne({
      where: { id },
      include: [
        {
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
          as: 'user',
        },
        {
          model: Users,
          required: false,
          attributes: ['id', 'name', 'email', 'phone', 'status', 'accessLevel'],
          as: 'userTeamLeader',
        },
      ],
    });

    return recruiter;
  },
};

const Mutation = {
  createCompanie: async (_: any, { file }: { file: any }) => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    console.log('\n\n\n\n\n file ---', file);

    try {
      const { createReadStream, filename, mimetype, encoding } = await file;
      console.log('\n\n\n\n\n filename ---', filename);

      const filePath = `./uploads/${filename}`;

      const stream = createReadStream();
      const out = fs.createWriteStream(filePath);
      stream.pipe(out);
      await finished(out, (error) => {
        console.log('error --', error);
      });

      // const out = fs.createWriteStream(`./uploads/${filename}`);
      // stream.pipe(out);
      // await finished(out, (err) => {
      //   console.log('err', err);
      // });

      // const stream = createReadStream();

      console.log('\n\n\n ---teste --', filePath);

      return { id: '1231' };
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
