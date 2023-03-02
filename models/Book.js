import mongoose, { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  googleBookId: { type: String, required: true, unique: true },
  authors: [String],
  description: String,
  publisher: String,
  publishedDate: String,
  categories: [String],
  category: String,
  price: Number,
  image: String,
  ISBN: String,
  pageCount: Number,
  textSnippet: String,
  bookLists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'BookList',
    default: [],
  },
});

bookSchema.virtual('ratings', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reference',
});

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
  virtuals: true,
});

export default mongoose.models['Book'] || model('Book', bookSchema);
