// config/gemini.js
// Gemini AI configuration
// Replace with your Gemini API key and endpoint as needed

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export { GEMINI_API_KEY, GEMINI_API_URL };
