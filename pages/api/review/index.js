import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import userExtractor from '@/middlewares/userExtractor';

import Review from '@/models/Review';

const handler = nc()
  .use(userExtractor)
  .get(async (req, res) => {
    await dbConnect();
    const user = req.user;
    const reviews = await Review.find({ user });
    res.json(reviews);
  });

export default handler;
