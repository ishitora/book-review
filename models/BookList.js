import mongoose, { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  image: String,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  create_time: String,
});

const BookList = model('BookList', bookSchema);

export default BookList;
