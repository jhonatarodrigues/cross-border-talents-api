import { errorHandler } from 'graphql-middleware-error-handler';

const errorHandlerMiddleware = errorHandler({
  onError: (error: any, context: any) => {
    // send error anywhere
    console.log('error --');
  },
  captureReturnedErrors: true,
  forwardErrors: false,
});

export default errorHandlerMiddleware;
