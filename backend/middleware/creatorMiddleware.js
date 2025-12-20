// middleware/creatorMiddleware.js
// Ensures only the creator of a component can modify/delete it
import Component from '../models/Component.model.js';

export const isCreator = async (req, res, next) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ message: 'Component not found' });
    if (component.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized as creator' });
    }
    req.component = component;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
