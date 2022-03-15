import { ContextParameters } from 'graphql-yoga/dist/types';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

export default ({ request }: ContextParameters) => {
  const token = request.get('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const { id, email } = jwt.verify(
        token,
        String(process.env.JWT_SECRET),
      ) as UserPayload;

      return {
        id,
        email,
      };
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};
