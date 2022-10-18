import mongoose, { Schema, model, Types } from 'mongoose';

interface IBookList {
  title: string;
  image: string;
  books: [Types.ObjectId];
  reviews: [Types.ObjectId];
  author: Types.ObjectId;
  description: string;
  create_time: string;
}

const bookSchema = new Schema<IBookList>({
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

module.exports = BookList;
