// controllers/componentController.js
import Component from '../models/Component.model.js';

// Upload new component (creator only)
export const uploadComponent = async (req, res) => {
  try {
    const { title, description, category, tags, previewImage, code } = req.body;
    const component = await Component.create({
      title,
      description,
      category,
      tags,
      previewImage,
      code,
      creator: req.user._id,
    });
    res.status(201).json(component);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all components (public)
export const getAllComponents = async (req, res) => {
  try {
    const components = await Component.find().populate('creator', 'username');
    res.json(components);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single component (public)
export const getComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id).populate('creator', 'username');
    if (!component) return res.status(404).json({ message: 'Component not found' });
    res.json(component);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update component (creator only)
export const updateComponent = async (req, res) => {
  try {
    const updates = req.body;
    Object.assign(req.component, updates);
    await req.component.save();
    res.json(req.component);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete component (creator only)
export const deleteComponent = async (req, res) => {
  try {
    await req.component.deleteOne();
    res.json({ message: 'Component deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all components by creator (dashboard)
export const getCreatorComponents = async (req, res) => {
  try {
    const components = await Component.find({ creator: req.user._id });
    res.json(components);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Increment downloads and send ZIP (public)
import JSZip from 'jszip';

export const downloadComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ message: 'Component not found' });
    component.downloads += 1;
    await component.save();
    const zip = new JSZip();
    if (component.code.html) zip.file('index.html', component.code.html);
    if (component.code.css) zip.file('style.css', component.code.css);
    if (component.code.js) zip.file('script.js', component.code.js);
    if (component.code.react) zip.file('Component.jsx', component.code.react);
    if (component.code.tailwind) zip.file('tailwind.css', component.code.tailwind);
    const content = await zip.generateAsync({ type: 'nodebuffer' });
    res.set({ 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename=${component.title}.zip` });
    res.send(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
