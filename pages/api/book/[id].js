import nc from 'next-connect';

import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';

const handler = nc().get(async (req, res) => {
  await dbConnect();

  console.log('req id', req.query);
  const book = await Book.findById(req.query.id);

  res.json(book);
});

export default handler;
