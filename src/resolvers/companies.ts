import bcrypt from 'bcryptjs';
import fs from 'fs';
import { finished } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import Companies from '../models/companies';
import Users from '../models/users';

interface ICreateCompanie {
  file: any;
  name: string;
  email: string;
  phone: string;
  status: boolean;
  country: string;
  companyName: string;
  teamLeader: string;
}

const Query = {
  companies: async () => {
    const db = await Companies.findAll({
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

    return db;
  },
  companie: (_: any, { id }: { id: string }) => {
    if (!id) {
      throw new Error('companieIdNotFound');
    }

    const db = Companies.findOne({
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

    return db;
  },
};

const Mutation = {
  createCompanie: async (
    _: any,
    {
      file,
      name,
      email,
      phone,
      status,
      country,
      companyName,
      teamLeader,
    }: ICreateCompanie,
  ) => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    try {
      let filePath = '';
      if (file) {
        const { createReadStream, filename } = await file;

        const extension = filename.split('.').pop();
        filePath = `./uploads/${uuidv4()}.${extension}`;

        const stream = createReadStream();
        const out = fs.createWriteStream(filePath);
        stream.pipe(out);
        await finished(out, (error) => {
          console.log('error --', error);
        });
      }

      const verifyUser = await Users.findOne({ where: { email } });
      if (verifyUser && verifyUser.id) {
        throw new Error('companieExists');
      }

      if (teamLeader) {
        const verifyTeamLeader = await Users.findOne({
          where: { id: teamLeader, accessLevel: 2 },
        });
        if (!verifyTeamLeader) {
          throw new Error('teamLeaderNotFound');
        }
      }

      const user = await Users.create({
        name,
        email,
        phone,
        status,
        accessLevel: 4,
        password: hashedPassword,
      });

      if (!user.id) {
        throw new Error('norCreateuser');
      }

      const companieAdd = await Companies.create({
        idUser: user.id,
        companyLogo: filePath,
        country,
        companyName,
        teamLeader,
      });

      if (!companieAdd.id) {
        throw new Error('companieNotCreate');
      }

      return { user: user, companie: companieAdd };
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
