import { ApolloError } from 'apollo-server-errors';
import { ContextParameters } from 'graphql-yoga/dist/types';
import jwt from 'jsonwebtoken';
import { resolve } from 'path';

interface UserPayload {
  id: string;
  email: string;
}

export default ({ request }: ContextParameters) => {
  const token = request.get('Authorization')?.replace('Bearer ', '');

  if (token) {
    const { id, email } = jwt.verify(
      token,
      String(process.env.JWT_SECRET),
    ) as UserPayload;

    return {
      id,
      email,
    } as UserPayload;
  }

  return {};
};
