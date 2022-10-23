import mongoose, { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  googleBookId: { type: String, required: true, unique: true },
  authors: [String],
  description: String,
  publisher: String,
  publishedDate: String,
  categories: [String],
  price: Number,
  image: String,
  ISBN: String,
  pageCount: Number,
  textSnippet: String,
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Review',
    default: [],
  },

  bookLists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'BookList',
    default: [],
  },
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

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models['Book'] || model('Book', bookSchema);
