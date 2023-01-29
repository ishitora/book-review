import mongoose, { Schema, model } from 'mongoose';
import { format } from 'date-fns';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  avatar: String,
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Review',
    default: [],
  },
  isOAuth: { type: Boolean, default: false },
  myBooks: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
      status: {
        type: Number,
        enum: [0, 1, 2], //0:want_to_read 1:currently_reading 2:read
      },
      create_date: {
        //加入書櫃日期
        type: String,
        default: format(new Date(), 'yyyy-MM-dd'),
      },
      start_date: String, //開始閱讀日期
      finish_date: String, //讀完書的日期
    },
  ],
  bookList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'BookList',
    default: [],
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default mongoose.models['User'] || model('User', userSchema);
