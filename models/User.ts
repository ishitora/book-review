import mongoose, { Schema, model, Types } from 'mongoose';

interface IUser {
  name: string;
  avatar: string;
  email: string;
  passwordHash: string;
  comment: string;
  likes: number;
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
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Review',
    default: [],
  },

  books: {
    want_to_read: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Book',
      default: [],
    },

    currently_reading: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Book',
      default: [],
    },

    read: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Book',
      default: [],
    },
  },
  bookList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'BookList',
    default: [],
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = 'user_' + returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default (mongoose.models['User'] as mongoose.Model<IUser>) ||
  model<IUser>('User', userSchema);
