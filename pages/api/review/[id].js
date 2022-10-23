import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
import userExtractor from '@/middlewares/userExtractor';

const handler = nc()
  .use(userExtractor)
  .post(async (req, res) => {
    await dbConnect();

    const user = req.user;
    const book = await Book.findById(req.query.id);

    console.log(book, user);

    res.json(book);
  });

export default handler;
