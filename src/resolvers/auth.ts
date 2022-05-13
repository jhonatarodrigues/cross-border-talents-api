import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import Users from '../models/users';

interface IMutationLogin {
  email: string;
  password: string;
}

const Mutation = {
  login: async (_: any, { email, password }: IMutationLogin) => {
    try {
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        throw new Error('No user with that email');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Incorrect password');
      }

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email, accessLevel: user.accessLevel },
        String(process.env.JWT_SECRET),
        { expiresIn: '1d' },
      );

      const refreshToken = jsonwebtoken.sign(
        { id: user.id, email: user.email, accessLevel: user.accessLevel },
        String(process.env.REFRESH_TOKEN_SECRET),
        { expiresIn: '7d' },
      );

      return {
        token,
        refreshToken,
        user,
      };
    } catch (error: any) {
      return error;
    }
  },
  refreshToken: async (_: any, { refreshToken }: { refreshToken: string }) => {
    try {
      const { id } = jsonwebtoken.verify(
        refreshToken,
        String(process.env.REFRESH_TOKEN_SECRET),
        (error) => {
          console.log('\n\n\n\n error expired ', error?.message);
          if (error?.message === 'jwt expired') {
            // throw new Error('refreshTokenExpired');
            return new ApolloError('refreshTokenExpired');
          }
        },
      ) as { id: string; email: string } | any;

      if (!id) {
        throw new Error('refreshTokenExpired');
      }

      console.log('\n\n\n id', id);

      const user = await Users.findOne({ where: { id } });
      if (!user) {
        throw new Error('No user with that email');
      }

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        String(process.env.JWT_SECRET),
        { expiresIn: '1d' },
      );
      const newRefreshToken = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        String(process.env.REFRESH_TOKEN_SECRET),
        { expiresIn: '7d' },
      );

      return {
        token,
        refreshToken: newRefreshToken,
        user,
      };
    } catch (error: any) {
      // console.log('\n\n\n\n error ---', error);
      return error;
    }
  },
};

export { Mutation };
