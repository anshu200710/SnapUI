// controllers/aiController.js
import axios from 'axios';
import { GEMINI_API_KEY, GEMINI_API_URL } from '../config/gemini.js';

// Helper to parse Gemini API response
function parseGeminiResponse(data) {
  // Gemini API may return candidates[0].content.parts[0].text (stringified JSON or plain text)
  let explanation = '';
  let code = {};
  try {
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Try to parse as JSON
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = null;
    }
    if (parsed && (parsed.explanation || parsed.code)) {
      explanation = parsed.explanation || '';
      code = parsed.code || {};
    } else {
      // Fallback: try to extract code blocks from plain text
      explanation = text;
      const reactMatch = text.match(/```react([\s\S]*?)```/);
      if (reactMatch) {
        code.react = reactMatch[1].trim();
      }
    }
  } catch (e) {
    explanation = 'Could not parse AI response.';
    code = {};
  }
  return { explanation, code };
}

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
    const parsed = parseGeminiResponse(response.data);
    res.json(parsed);
  } catch (err) {
    console.error('AI Generation Error:', err.response?.data || err.message);
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
    const parsed = parseGeminiResponse(response.data);
    res.json(parsed);
  } catch (err) {
    console.error('AI Generation Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to generate UI' });
  }
};
