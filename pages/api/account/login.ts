import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import nc from 'next-connect';
import bcrypt from 'bcrypt';

import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const { email, password } = req.body;

  await dbConnect();
  const user = await User.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  res.json({ token, accountData: user });
});

export default handler;
