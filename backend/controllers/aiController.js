// controllers/aiController.js
import axios from 'axios';
import { GEMINI_API_KEY, GEMINI_API_URL } from '../config/gemini.js';

// Generate UI from text prompt
export const generateUIFromText = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: 'Prompt required' });
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
      }
    );
    const result = response.data;
    // Parse Gemini response for explanation and code
    res.json({ explanation: result.explanation, code: result.code });
  } catch (err) {
    console.error('AI Generation Error:', err.response?.data || err.message); // ✅ Log error
    res.status(500).json({ message: 'Failed to generate UI' });
  }
};

// Generate UI from image URL
export const generateUIFromImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ message: 'Image URL required' });
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: `Generate UI for this image: ${imageUrl}` }] }],
      },
      {
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
      }
    );
    const result = response.data;
    res.json({ explanation: result.explanation, code: result.code });
  } catch (err) {
    console.error('AI Generation Error:', err.response?.data || err.message); // ✅ Log error
    res.status(500).json({ message: 'Failed to generate UI' });
  }
};
