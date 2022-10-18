import mongoose, { Schema, model, Types } from 'mongoose';

interface IBook {
  title: string;
  reviews: [Types.ObjectId];
  authors: [string];
  description: string;
  publisher: string;
  publishedDate: string;
  categories: [string];
  image: string;
  ISBN: string;
  readers: {
    want_to_read: [Types.ObjectId];
    currently_reading: [Types.ObjectId];
    read: [Types.ObjectId];
  };
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  authors: [String],
  description: String,
  publisher: String,
  publishedDate: String,
  categories: [String],
  image: String,
  ISBN: String,
  readers: {
    want_to_read: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    currently_reading: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    read: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
});

const Book = model('Book', bookSchema);

module.exports = Book;
