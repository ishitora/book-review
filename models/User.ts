import mongoose, { Schema, model, Types } from 'mongoose';

interface IUser {
  name: string;
  avatar: string;
  email: string;
  passwordHash: string;
  comment: String;
  likes: Number;
  reviews: [Types.ObjectId];
  books: {
    want_to_read: [Types.ObjectId];
    currently_reading: [Types.ObjectId];
    read: [Types.ObjectId];
  };
  bookList: [Types.ObjectId];
}

const userSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  avatar: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  books: {
    want_to_read: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    currently_reading: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    read: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  bookList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookList',
    },
  ],
});

const Review = model('User', userSchema);
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = 'user_' + returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = Review;
