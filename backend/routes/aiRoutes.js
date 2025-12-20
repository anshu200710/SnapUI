// routes/aiRoutes.js
import express from 'express';
import { generateUIFromText, generateUIFromImage } from '../controllers/aiController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// AI endpoints (protected, creators and admins)
router.post('/generate/text', protect, authorizeRoles('creator', 'admin'), generateUIFromText);
router.post('/generate/image', protect, authorizeRoles('creator', 'admin'), generateUIFromImage);

export default router;
