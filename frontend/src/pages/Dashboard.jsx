// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { fetchComponents, user } = useContext(AuthContext);
  const [myComponents, setMyComponents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchComponents()
      .then(data => setMyComponents(data.filter(c => c.creator?._id === user?.id)))
      .finally(() => setLoading(false));
  }, [fetchComponents, user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-white"
      >
        My Uploaded Components
      </motion.h2>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myComponents.length === 0 ? (
            <div className="col-span-2 text-center text-gray-400">No components uploaded yet.</div>
          ) : (
            myComponents.map(comp => (
              <motion.div
                key={comp._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col items-center"
              >
                <img src={comp.previewImage || ''} alt={comp.title} className="w-24 h-16 object-cover rounded mb-3 bg-gray-700" />
                <div className="font-semibold text-lg text-white mb-1">{comp.title}</div>
                <div className="text-gray-400 text-sm mb-2">{comp.category}</div>
                <div className="flex gap-2 flex-wrap justify-center mb-2">
                  {comp.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">Edit</button>
                  <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs">Delete</button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
