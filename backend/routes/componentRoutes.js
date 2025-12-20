// routes/componentRoutes.js
import express from 'express';
import {
  uploadComponent,
  getAllComponents,
  getComponent,
  updateComponent,
  deleteComponent,
  getCreatorComponents,
  downloadComponent
} from '../controllers/componentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { isCreator } from '../middleware/creatorMiddleware.js';

const router = express.Router();

// Public
router.get('/', getAllComponents);
router.get('/:id', getComponent);
router.get('/:id/download', downloadComponent);

// Creator dashboard
router.get('/creator/dashboard', protect, authorizeRoles('creator', 'admin'), getCreatorComponents);
router.post('/', protect, authorizeRoles('creator', 'admin'), uploadComponent);
router.put('/:id', protect, authorizeRoles('creator', 'admin'), isCreator, updateComponent);
router.delete('/:id', protect, authorizeRoles('creator', 'admin'), isCreator, deleteComponent);

export default router;
