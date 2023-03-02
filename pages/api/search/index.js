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
  console.log('req.query', req.query);

  req.query.catelogy;

  const allBooks = await Book.find({}).populate({
    path: 'ratings',
    transform: (doc) => {
      return doc ? { rating: doc?.rating } : null;
    },
  });

  //   for (const book of allBooks) {
  //     book.category = book.categories?.[0] || '';
  //     console.log(book);
  //     await book.save();
  //   }
  // 搜尋後用全部結果 分頁 一次10個
  const findBooks = allBooks.filter((book) =>
    book?.title?.includes(req.query.keyword)
  );

  const searchRes = {
    total: findBooks.length,
    books: sliceByPage(findBooks, req.query.p),
  };

  res.json(searchRes);
});

export default handler;
