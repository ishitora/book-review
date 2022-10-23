import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import nc from 'next-connect';
import bcrypt from 'bcrypt';

import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

const userExtractor = async (req, res, next) => {
  await dbConnect();

  // code that extracts the token
  console.log(req?.cookies?.token);
  if (!req?.cookies?.token || !req?.cookies?.token.startsWith('Bearer')) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const token = req.cookies.token.replace('Bearer ', '');
  console.log('token', token);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log('decodedToken', decodedToken);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  } else {
    req.user = await User.findById(decodedToken.id);
  }

  next();
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
})
  .use(userExtractor)
  .get(async (req, res) => {
    console.log('req', req.user);

    res.json(req.user);
  });

export default handler;
