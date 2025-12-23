// src/pages/AIStudio.jsx
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Code, Play, AlertCircle, Loader2, Copy } from 'lucide-react';
import axios from 'axios';

export default function AIStudio() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useContext(ThemeContext);

  const API_BASE = '';

  const handleGenerate = async (type) => {
    setLoading(true);
    setError('');
    try {
      const endpoint = type === 'text' ? 'generate/text' : 'generate/image';
      const payload = type === 'text' ? { prompt } : { imageUrl };
      const res = await axios.post(`${API_BASE}/api/ai/${endpoint}`, payload);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100-72px)] transition-colors duration-300 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-2">
            <Sparkles size={20} />
            <span className="uppercase tracking-widest text-xs">AI-Powered Forge</span>
          </motion.div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">AI Studio</h2>
          <p className="text-gray-500 dark:text-neutral-400 mt-2">Turn ideas or images into production-ready React components.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Input Control Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
              <label className="block text-sm font-bold mb-4 text-gray-700 dark:text-neutral-300 flex items-center gap-2">
                <Code size={16} /> Prompt-to-Component
              </label>
              <textarea 
                rows="4"
                placeholder="Describe your UI (e.g., A modern dashboard card for a fitness app)..." 
                value={prompt} 
                onChange={e => setPrompt(e.target.value)} 
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-neutral-800 border-none text-gray-900 dark:text-white focus:ring-2 ring-indigo-500 mb-4 transition-all resize-none"
              />
              <button 
                onClick={() => handleGenerate('text')} 
                disabled={loading || !prompt}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold transition-all shadow-lg shadow-indigo-500/20"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Generate UI
              </button>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
              <label className="block text-sm font-bold mb-4 text-gray-700 dark:text-neutral-300 flex items-center gap-2">
                <ImageIcon size={16} /> Image-to-Code
              </label>
              <input 
                type="text" 
                placeholder="Paste Screenshot URL..." 
                value={imageUrl} 
                onChange={e => setImageUrl(e.target.value)} 
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-neutral-800 border-none text-gray-900 dark:text-white focus:ring-2 ring-pink-500 mb-4 transition-all" 
              />
              <button 
                onClick={() => handleGenerate('image')} 
                disabled={loading || !imageUrl}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold transition-all shadow-lg shadow-pink-500/20"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
                Reverse Engineer
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 flex items-center gap-3">
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Output/Preview Workspace */}
          <div className="lg:col-span-8">
            {!result && !loading && (
              <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-3xl flex flex-col items-center justify-center text-center p-12">
                <div className="size-16 bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-400">Ready for generation</h3>
                <p className="text-gray-400 max-w-xs mt-2">Enter a prompt or image URL to see the magic happen here.</p>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[400px] bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
                <p className="text-lg font-bold animate-pulse text-gray-600 dark:text-neutral-300">Forging your UI...</p>
              </div>
            )}

            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
                  {/* Header/Tabs */}
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex gap-4">
                      <span className="text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 pb-4 -mb-4.5">Code Output</span>
                      <span className="text-sm font-medium text-gray-400 cursor-not-allowed">Live Preview (Coming Soon)</span>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition" title="Copy Code">
                      <Copy size={18} className="text-gray-500" />
                    </button>
                  </div>
                  
                  {/* Explanation Area */}
                  <div className="p-6 bg-indigo-50/50 dark:bg-indigo-900/10">
                    <p className="text-sm text-indigo-900 dark:text-indigo-300 leading-relaxed italic">
                      "{result.explanation}"
                    </p>
                  </div>

                  {/* Code Area */}
                  <div className="p-6 bg-gray-950">
                    <pre className="text-sm font-mono text-emerald-400 overflow-x-auto whitespace-pre">
                      <code>{result.code?.react || '// No code returned'}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}