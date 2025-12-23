// routes/aiRoutes.js
import express from 'express';
import { generateUIFromText, generateUIFromImage } from '../controllers/aiController.js';
// import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const AIrouter = express.Router();

// AI endpoints (unprotected for now)
AIrouter.post('/generate/text', generateUIFromText);
AIrouter.post('/generate/image', generateUIFromImage);

export default AIrouter;