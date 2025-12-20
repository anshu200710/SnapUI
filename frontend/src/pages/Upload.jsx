// src/pages/Upload.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';

const initialCode = { html: '', css: '', js: '', react: '', tailwind: '' };

export default function Upload() {
  const { uploadComponent, user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCode({ ...code, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await uploadComponent({
        title,
        description,
        category,
        tags: tags.split(',').map(t => t.trim()),
        previewImage,
        code,
      });
      setSuccess(true);
      setTitle(''); setDescription(''); setCategory(''); setTags(''); setPreviewImage(''); setCode(initialCode);
    } catch (err) {
      setError(err);
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
        Upload UI Component
      </motion.h2>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col gap-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="px-4 py-2 rounded bg-gray-800 text-white" />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="px-4 py-2 rounded bg-gray-800 text-white" />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required className="px-4 py-2 rounded bg-gray-800 text-white" />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="px-4 py-2 rounded bg-gray-800 text-white" />
        <input type="text" placeholder="Preview Image URL" value={previewImage} onChange={e => setPreviewImage(e.target.value)} className="px-4 py-2 rounded bg-gray-800 text-white" />
        {/* Monaco Editor for each language */}
        {Object.keys(code).map(lang => (
          <div key={lang} className="mb-4">
            <label className="block text-gray-300 mb-1 font-semibold">{lang.toUpperCase()} Code</label>
            <MonacoEditor
              height="150px"
              language={lang === 'js' ? 'javascript' : lang === 'react' ? 'javascript' : lang}
              theme="vs-dark"
              value={code[lang]}
              options={{ fontSize: 14, minimap: { enabled: false } }}
              onChange={value => setCode(c => ({ ...c, [lang]: value }))}
            />
          </div>
        ))}
        <button type="submit" disabled={loading} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition">
          {loading ? 'Uploading...' : 'Upload Component'}
        </button>
        {success && <div className="text-green-400">Component uploaded successfully!</div>}
        {error && <div className="text-red-400">{error}</div>}
      </form>
    </div>
  );
}
