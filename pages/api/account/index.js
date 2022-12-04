import nc from 'next-connect';

import userExtractor from '@/middlewares/userExtractor';
import Book from '@/models/Book';
import Review from '@/models/Review';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
})
  .use(userExtractor)
  .get(async (req, res) => {
    const user = req.user;
    await user.populate({
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
    res.json(user);
  });

export default handler;
