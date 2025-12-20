// src/pages/ComponentDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';

const codeTabs = ["HTML", "CSS", "JS", "React", "Tailwind"];

export default function ComponentDetail() {
  const { id } = useParams();
  const { fetchComponents, downloadComponent } = useContext(AuthContext);
  const [component, setComponent] = useState(null);
  const [activeTab, setActiveTab] = useState("React");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchComponents()
      .then(data => {
        const found = data.find(c => c._id === id);
        setComponent(found || null);
      })
      .finally(() => setLoading(false));
  }, [id, fetchComponents]);

  const handleDownload = async (lang) => {
    if (!component) return;
    try {
      await downloadComponent(component._id);
      // Optionally show toast
    } catch {}
  };

  if (loading) return <div className="text-center text-gray-400 py-10">Loading...</div>;
  if (!component) return <div className="text-center text-gray-400 py-10">Component not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4 text-white"
      >
        {component.title}
      </motion.h2>
      <div className="mb-6 flex gap-6 items-center">
        <img src={component.previewImage || ''} alt={component.title} className="w-32 h-20 object-cover rounded bg-gray-700" />
        <div>
          <div className="text-gray-300 mb-2">{component.description}</div>
          <div className="flex gap-2 flex-wrap">
            {component.tags?.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Live preview */}
      <div className="mb-8">
        <iframe
          title="Live Preview"
          srcDoc={component.code?.html || "<div>Preview not available</div>"}
          className="w-full h-64 rounded border border-gray-800 bg-gray-950"
        />
      </div>
      {/* Code tabs with Monaco Editor */}
      <div className="mb-8">
        <div className="flex gap-2 mb-2">
          {codeTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t bg-gray-800 text-sm font-semibold ${activeTab === tab ? 'text-blue-400 bg-gray-900' : 'text-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-gray-900 p-4 rounded-b min-h-[180px]">
          <MonacoEditor
            height="160px"
            language={activeTab === 'JS' ? 'javascript' : activeTab === 'React' ? 'javascript' : activeTab.toLowerCase()}
            theme="vs-dark"
            value={component.code?.[activeTab.toLowerCase()] || 'No code available.'}
            options={{ readOnly: true, fontSize: 14, minimap: { enabled: false } }}
          />
        </div>
        <div className="flex gap-2 mt-4">
          {codeTabs.map(tab => (
            <button
              key={tab}
              onClick={() => handleDownload(tab.toLowerCase())}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
            >
              Download {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Reviews & rating */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-xl">★</span>
          <span className="font-bold text-lg">{component.averageRating?.toFixed(1) || '0.0'}</span>
          <span className="text-gray-400 text-sm">({component.downloads} downloads)</span>
        </div>
        {/* TODO: Map reviews here */}
        <div className="bg-gray-900 rounded p-4">
          <div className="text-gray-300 mb-2 font-semibold">Reviews</div>
          <div className="text-gray-400 text-sm">No reviews yet.</div>
        </div>
      </div>
    </div>
  );
}
