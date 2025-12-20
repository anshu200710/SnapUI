// controllers/reviewController.js
import Review from '../models/Review.model.js';
import Component from '../models/Component.model.js';

// Add or update review (one per user per component)
export const addOrUpdateReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const { id } = req.params; // component id
    let rev = await Review.findOne({ user: req.user._id, component: id });
    if (rev) {
      rev.rating = rating;
      rev.review = review;
      await rev.save();
    } else {
      rev = await Review.create({ user: req.user._id, component: id, rating, review });
    }
    // Update average rating
    const reviews = await Review.find({ component: id });
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Component.findByIdAndUpdate(id, { averageRating: avg });
    res.json(rev);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews for a component
export const getComponentReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ component: req.params.id }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
