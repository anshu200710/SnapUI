// models/Component.model.js
import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
  html: String,
  css: String,
  js: String,
  react: String,
  tailwind: String,
}, { _id: false });

const componentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  tags: [String],
  previewImage: String,
  code: codeSchema,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  downloads: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Component', componentSchema);
