import nc from 'next-connect';
import axios from 'axios';
import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
import Review from '@/models/Review';

const sliceByPage = (arr, page) => {
  return arr.slice((page - 1) * 10, (page - 1) * 10 + 10);
};

const handler = nc().get(async (req, res) => {
  await dbConnect();

  const allBooks = await Book.find({}).populate({
    path: 'ratings',
    transform: (doc) => {
      return doc ? { rating: doc?.rating } : null;
    },
  });

  const categories = {};

  const searchedBooks = allBooks.filter((book) =>
    book?.title?.includes(req.query.keyword)
  );

  for (const book of searchedBooks) {
    if (book.category) {
      categories[book.category] = categories[book.category]
        ? categories[book.category] + 1
        : 1;
    }
  }

  const findBooks = searchedBooks.filter(
    (book) =>
      !req.query.catelogy ||
      book.category === req.query.catelogy.replace('%26', '&')
  );

  const searchRes = {
    total: searchedBooks.length,
    count: findBooks.length,
    categories,
    books: sliceByPage(findBooks, req.query.p),
  };

  res.json(searchRes);
});

export default handler;
