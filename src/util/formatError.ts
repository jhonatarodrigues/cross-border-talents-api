import { formatError as formatApolloError } from 'apollo-errors';
import { ApolloError } from 'apollo-server-errors';

function formatError(error: any) {
  const { message } = error;

  if (message === 'Not Authorised!') {
    return new ApolloError('notAuthorized', 'notAuthorized', {});
  }

  return formatApolloError(error);
}

export default formatError;
