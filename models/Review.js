import mongoose, { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  reference: { type: Schema.Types.ObjectId, refPath: 'model_type' },
  model_type: { type: String, enum: ['Book', 'BookList'], required: true },
  rating: Number,
  comment: String,
  likes: Number,
  create_time: String,
});

reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models['Review'] || model('Review', reviewSchema);
