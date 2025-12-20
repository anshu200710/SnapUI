// models/Review.model.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  component: { type: mongoose.Schema.Types.ObjectId, ref: 'Component', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String },
}, { timestamps: true });

reviewSchema.index({ user: 1, component: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
