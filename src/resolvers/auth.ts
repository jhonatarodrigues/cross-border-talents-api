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
      const user = await Users.findOne({ where: { email }});

      if (!user) {
        throw new Error('No user with that email')
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Incorrect password')
      }

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email},
        String(process.env.JWT_SECRET),
        { expiresIn: '1d'}
      )

      const refreshToken = jsonwebtoken.sign(
        { id: user.id, email: user.email},
        String(process.env.REFRESH_TOKEN_SECRET),
        { expiresIn: '7d'}
      )

      return {
        token, 
        refreshToken, 
        user
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
};

export {  Mutation };