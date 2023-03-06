import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
import userExtractor from '@/middlewares/userExtractor';

import Review from '@/models/Review';

const handler = nc()
  .get(async (req, res) => {
    await dbConnect();
    const reviews = await Review.find({ reference: req.query.id })
      .sort({ create_date: -1 })
      .limit(10)
      .populate('user', {
        id: 1,
        name: 1,
        avatar: 1,
      });
    res.json(reviews);
  })
  .use(userExtractor)
  .post(async (req, res) => {
    await dbConnect();
    const user = req.user;
    const book = await Book.findById(req.query.id);
    const { title, content, rating } = req.body;
    const review = new Review({
      user: user._id,
      title: title,
      reference: book._id,
      model_type: 'Book',
      rating: rating,
      content: content,
      likes: 0,
    });

    await review.save();
    res.json(review);
  });

export default handler;
