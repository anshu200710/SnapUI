// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    /* Structural classes are shared; colors use dark: prefix */
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 transition-colors duration-300 bg-white text-gray-700 dark:bg-black dark:text-gray-300">
      
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        UIForge
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-lg md:text-2xl text-center mb-8 max-w-2xl text-gray-700 dark:text-gray-300"
      >
        Build, explore, and generate stunning UI components. Powered by AI. Developer-focused. Open to creators.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="flex gap-4 mb-10"
      >
        <Link to="/explore" className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition transform hover:scale-105">
          Trending Components
        </Link>
        <Link to="/ai-studio" className="px-6 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg transition transform hover:scale-105">
          AI UI Generator
        </Link>
      </motion.div>

      {/* Trending Section */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Trending UI Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TrendCard title="Button Group" author="CreatorX" gradient="from-blue-400 to-purple-400" />
          <TrendCard title="Card Layout" author="UIPro" gradient="from-pink-400 to-yellow-400" />
          <TrendCard title="Navbar" author="DevGuru" gradient="from-green-400 to-blue-400" />
        </div>
      </div>
    </div>
  );
}

// Helper component to keep code clean
function TrendCard({ title, author, gradient }) {
  return (
    <div className="rounded-lg p-6 shadow-md flex flex-col items-center transition-all bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
      <div className={`w-24 h-16 bg-gradient-to-br ${gradient} rounded mb-3 shadow-sm`} />
      <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{title}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">by {author}</div>
    </div>
  );
}