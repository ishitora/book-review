import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
import userExtractor from '@/middlewares/userExtractor';
import { format } from 'date-fns';

const handler = nc()
  .use(userExtractor)
  .put(async (req, res) => {
    await dbConnect();
    const user = req.user;
    const book = await Book.findById(req.query.id);
    const { status } = req.body;

    let findBook = user.myBooks.find(
      (b) => b.book.toString() === book._id.toString()
    );

    if (findBook) {
      findBook.status = status;
      switch (status) {
        case 0:
          findBook.start_date = '';
          findBook.finish_date = '';
          break;
        case 1:
          findBook.start_date = format(new Date(), 'yyyy-MM-dd');
          findBook.finish_date = '';
          break;
        case 2:
          findBook.finish_date = format(new Date(), 'yyyy-MM-dd');
          if (!findBook.start_date) {
            findBook.start_date = format(new Date(), 'yyyy-MM-dd');
          }
          break;
      }
      await user.save();
    } else {
      findBook = {
        book: book._id,
        status,
        create_date: format(new Date(), 'yyyy-MM-dd'),
        start_date: status === 0 ? '' : format(new Date(), 'yyyy-MM-dd'),
        finish_date: status === 2 ? format(new Date(), 'yyyy-MM-dd') : '',
      };
      user.myBooks.push(findBook);
      await user.save();
    }

    res.json(findBook);
  })
  .delete(async (req, res) => {
    await dbConnect();
    const user = req.user;

    user.myBooks = user.myBooks.filter(
      (book) => book.book.toString() !== req.query.id.toString()
    );

    await user.save();
    res.status(204).send();
  });

export default handler;
