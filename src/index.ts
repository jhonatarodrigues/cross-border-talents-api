import 'dotenv/config';

import { Request, Response } from 'express';
import { GraphQLServer } from 'graphql-yoga';

import db from './db';
import Schema from './graphql';
import errorHandler from './middlewares/error';
import permissions from './middlewares/permissions';
import resolvers from './resolvers';
import Multer from './util/configUpload';
import formatError from './util/formatError';
import verifyJWT from './verifyJWT';

// -- sincroniza o banco de dados
db.sync();

const server = new GraphQLServer({
  typeDefs: Schema,
  resolvers,
  middlewares: [errorHandler, permissions],
  context: (req) => ({
    ...req,
    authenticated: verifyJWT(req),
  }),
});

server.post('/upload', Multer.single('file'), (req: any, res: Response) => {
  if (!req.file) {
    res.status(400).send({ error: 'errorSendFile' });
  }

  res.json({ fileName: req.file.filename });
});

server
  .start({
    formatError,
    endpoint: '/',
  })
  .then(() => console.log(`Server is running on http://localhost:4000`));
