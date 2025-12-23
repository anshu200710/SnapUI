// src/pages/AIStudio.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function AIStudio() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use full URL for local dev if needed:
  // const API_BASE = 'http://localhost:5000';
  const API_BASE = '';

  const handleGenerate = async (type) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      let res;
      if (type === 'text') {
        res = await axios.post(`${API_BASE}/api/ai/generate/text`, { prompt });
      } else {
        res = await axios.post(`${API_BASE}/api/ai/generate/image`, { imageUrl });
      }
      setResult(res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to generate UI');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-white"
      >
        AI UI Generator
      </motion.h2>
      <div className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col gap-4 mb-6">
        <input type="text" placeholder="Enter prompt..." value={prompt} onChange={e => setPrompt(e.target.value)} className="px-4 py-2 rounded bg-gray-800 text-white" />
        <button onClick={() => handleGenerate('text')} disabled={loading || !prompt} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition">Generate from Prompt</button>
        <input type="text" placeholder="Image URL..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="px-4 py-2 rounded bg-gray-800 text-white" />
        <button onClick={() => handleGenerate('image')} disabled={loading || !imageUrl} className="px-6 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg transition">Generate from Image</button>
        {error && <div className="text-red-400">{error}</div>}
      </div>
      {loading && <div className="text-center text-gray-400">Generating...</div>}
      {result && (
        <div className="bg-gray-900 rounded-lg p-6 shadow-md mt-6">
          <div className="font-semibold text-lg text-white mb-2">AI Output</div>
          <div className="text-gray-300 mb-4">{result.explanation}</div>
          <div className="bg-gray-800 p-4 rounded">
            <pre className="whitespace-pre-wrap text-xs text-gray-200">{result.code?.react || 'No code available.'}</pre>
          </div>
          {/* TODO: Add live preview and download/save options */}
        </div>
      )}
    </div>
  );
}
