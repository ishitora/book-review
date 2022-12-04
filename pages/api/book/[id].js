import nc from 'next-connect';

import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';

const handler = nc().get(async (req, res) => {
  await dbConnect();

  const book = await Book.findById(req.query.id).populate({
    path: 'ratings',
    transform: (doc) => {
      return doc?.rating ? { rating: doc?.rating } : doc;
    },
  });

  res.json(book);
});

export default handler;
