import mongoose, { Schema, model } from 'mongoose';
import { format } from 'date-fns';

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  reference: { type: Schema.Types.ObjectId, refPath: 'model_type' },
  model_type: { type: String, enum: ['Book', 'BookList'], required: true },
  rating: Number,
  content: String,
  likes: Number,
  create_date: {
    type: String,
    default: format(new Date(), 'yyyy-MM-dd'),
  },
});

reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models['Review'] || model('Review', reviewSchema);
