import mongoose, { Schema, model, Types } from 'mongoose';

interface IReview {
  user: Types.ObjectId;
  rating: number;
  comment: string;
  likes: number;
  create_time: string;
  reference: Types.ObjectId;
  model_type: 'Book' | 'BookList';
}

const reviewSchema = new Schema<IReview>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reference: { type: Schema.Types.ObjectId, refPath: 'model_type' },
  model_type: { type: String, enum: ['Book', 'BookList'], required: true },
  rating: Number,
  comment: String,
  likes: Number,
  create_time: String,
});
const Review = model('Review', reviewSchema);

module.exports = Review;
