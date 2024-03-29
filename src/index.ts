import 'dotenv/config';

import express, { Response } from 'express';
import fs from 'fs';
import { GraphQLServer } from 'graphql-yoga';

import Schema from './graphql';
import errorHandler from './middlewares/error';
import permissions from './middlewares/permissions';
import resolvers from './resolvers';
import Multer from './util/configUpload';
import formatError from './util/formatError';
import verifyJWT from './verifyJWT';

const server = new GraphQLServer({
  typeDefs: Schema,
  resolvers,
  middlewares: [errorHandler],
  context: (req) => ({
    ...req,
    authenticated: verifyJWT(req),
  }),
});

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

server.post('/upload', Multer.single('file'), (req: any, res: Response) => {
  if (!req.file) {
    res.status(400).send({ error: 'errorSendFile' });
  }

  res.json({ fileName: req.file.filename });
});
server.use('/files', express.static('uploads'));

server
  .start({
    formatError,
    endpoint: '/',
    playground: process.env.PLAYGROUND,
  })
  .then(() => console.log(`Server is running on http://localhost:4000`));
