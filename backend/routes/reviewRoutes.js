// routes/reviewRoutes.js
import express from 'express';
import { addOrUpdateReview, getComponentReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id', protect, addOrUpdateReview); // Add/update review
router.get('/:id', getComponentReviews); // Get all reviews for a component

export default router;
