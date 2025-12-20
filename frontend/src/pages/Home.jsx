// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-6xl font-extrabold text-center mb-6 text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        UIForge
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-lg md:text-2xl text-gray-300 text-center mb-8 max-w-2xl"
      >
        Build, explore, and generate stunning UI components. Powered by AI. Developer-focused. Open to creators.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="flex gap-4 mb-10"
      >
        <Link to="/explore" className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition">Trending Components</Link>
        <Link to="/ai-studio" className="px-6 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg transition">AI UI Generator</Link>
      </motion.div>
      {/* Trending section placeholder */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Trending UI Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO: Map trending components here */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col items-center">
            <div className="w-24 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded mb-3" />
            <div className="font-semibold text-lg text-white mb-1">Button Group</div>
            <div className="text-gray-400 text-sm">by CreatorX</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col items-center">
            <div className="w-24 h-16 bg-gradient-to-br from-pink-400 to-yellow-400 rounded mb-3" />
            <div className="font-semibold text-lg text-white mb-1">Card Layout</div>
            <div className="text-gray-400 text-sm">by UIPro</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col items-center">
            <div className="w-24 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded mb-3" />
            <div className="font-semibold text-lg text-white mb-1">Navbar</div>
            <div className="text-gray-400 text-sm">by DevGuru</div>
          </div>
        </div>
      </div>
    </div>
  );
}
