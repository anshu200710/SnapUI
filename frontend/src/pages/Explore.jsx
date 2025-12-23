// src/pages/Explore.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, ThemeContext } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = ["All", "Buttons", "Cards", "Navbars", "Forms", "Modals", "Tables"];

export default function Explore() {
  const { fetchComponents } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [components, setComponents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetchComponents()
      .then(data => {
        // Handle both array and object responses
        const comps = Array.isArray(data)
          ? data
          : Array.isArray(data.components)
          ? data.components
          : [];

        setComponents(comps);
      })
      .catch(err => {
        console.error("Error fetching components:", err);
        setComponents([]);
      })
      .finally(() => setLoading(false));
  }, [fetchComponents]);

  // Filtered components safely
  const filtered = Array.isArray(components)
    ? components.filter(c => {
        const matchesCategory = category === "All" || c.category === category;
        const matchesSearch =
          !search ||
          c.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
          c.title?.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    : [];

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-white"
      >
        Explore UI Components
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by tags or title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none w-full md:w-1/2"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none w-full md:w-1/4"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">No components found.</div>
          ) : (
            filtered.map(comp => (
              <motion.div
                key={comp._id || comp.id} // fallback for id
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigate(`/component/${comp._id || comp.id}`)}
                className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col items-center hover:scale-105 transition cursor-pointer"
                role="button"
                title={`Open ${comp.title || 'component'}`}
              >
                <img
                  src={comp.previewImage || ''}
                  alt={comp.title || 'Component'}
                  className="w-24 h-16 object-cover rounded mb-3 bg-gray-700"
                />
                <div className="font-semibold text-lg text-white mb-1">{comp.title || 'Untitled'}</div>
                <div className="text-gray-400 text-sm mb-2">{comp.category || 'Unknown'}</div>
                <div className="flex gap-2 flex-wrap justify-center mb-2">
                  {Array.isArray(comp.tags) && comp.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">{tag}</span>
                  ))}
                </div>
                <div className="text-gray-400 text-xs">
                  by {comp.creator?.username || 'Unknown'}
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
