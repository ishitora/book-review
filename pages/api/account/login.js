import jwt from 'jsonwebtoken';
import nc from 'next-connect';
import bcrypt from 'bcrypt';

import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import Book from '@/models/Book';
import Review from '@/models/Review';
const handler = nc().post(async (req, res) => {
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
    expiresIn: 60 * 60 * 24 * 2,
  });

  const accountData = await user.populate({
    path: 'myBooks',
    populate: {
      path: 'book',
      model: 'Book',
      select: ['title', 'authors', 'image'],
      populate: {
        path: 'ratings',
        select: 'rating -reference',
        match: { user: user._id },
      },
    },
  });
  res.json({ token, accountData });
});

export default handler;
