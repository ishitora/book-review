import nc from 'next-connect';

import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
import Review from '@/models/Review';
const arr = [
  '638cbc297b9469297a09c859',
  '638cbc2b7b9469297a09c868',
  '638cbc297b9469297a09c85c',
  '638cbc2a7b9469297a09c85f',
  '638cbc2a7b9469297a09c862',
  '638cbc2b7b9469297a09c865',
];
const handler = nc().get(async (req, res) => {
  await dbConnect();

  const allBooks = await Book.find({ _id: { $in: arr } }).populate({
    path: 'ratings',
    transform: (doc) => {
      return doc ? { rating: doc?.rating } : null;
    },
  });
  res.json([
    {
      title: '奇幻',
      books: allBooks,
    },
  ]);
});

export default handler;
