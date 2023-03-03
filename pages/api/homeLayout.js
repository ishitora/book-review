import nc from 'next-connect';

import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
import Review from '@/models/Review';
const arr = [
  '64021744437da6516b92a6a4',
  '64021744437da6516b92a6a7',
  '64021744437da6516b92a6aa',
  '64021744437da6516b92a6b6',
  '640214dc437da6516b92a30c',
  '640214dc437da6516b92a30f',
  '640214dc437da6516b92a318',
  '64021737437da6516b92a68e',
  '64021737437da6516b92a691',
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
