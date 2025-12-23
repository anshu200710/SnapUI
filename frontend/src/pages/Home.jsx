// src/pages/Home.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/AuthContext.jsx';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`transition-colors duration-500 min-h-screen ${
      theme === 'dark' 
      ? 'bg-black' 
      : 'bg-gradient-to-b from-[#f7f9ff] via-[#fffbee] to-[#f7f9ff]'
    }`}>
      <main className="flex flex-col items-center px-6 pt-16 pb-24 max-w-7xl mx-auto w-full">
        
        {/* Animated Top Badge */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 border border-indigo-600/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full px-4 py-1.5 bg-white/50 dark:bg-neutral-900/50 backdrop-blur hover:bg-indigo-50 transition"
        >
          <span>Explore how we help build the future of UI</span>
          <span className="flex items-center justify-center size-5 rounded-full bg-indigo-600 text-white">
            <ArrowRight size={12} />
          </span>
        </motion.button>

        {/* Hero Content */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-900 dark:text-white font-bold text-4xl sm:text-6xl max-w-3xl leading-[1.1]"
        >
          Preferred choice of creators in <br />
          <span className="text-indigo-600 dark:text-indigo-400 italic">every industry</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center text-gray-600 dark:text-gray-400 max-w-lg text-lg leading-relaxed"
        >
          Build, explore, and generate stunning UI components powered by AI. 
          The modern forge for developer-focused interfaces.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link to="/ai-studio" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-indigo-700 transition shadow-xl shadow-indigo-500/20">
            <Sparkles size={18} /> Generate with AI
          </Link>
          <Link to="/explore" className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white border border-gray-200 dark:border-neutral-800 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition">
            Explore Library
          </Link>
        </motion.div>

        {/* Floating Component Cards (Leader Section) */}
        <div className="mt-16 flex overflow-x-auto md:justify-center gap-6 w-full pb-8 no-scrollbar">
          {[
            { img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400", label: "Button Packs" },
            { img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400", label: "Dashboard Kits" },
            { img: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=400", label: "Glass Cards" },
            { img: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400", label: "Navbars" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              className="group relative flex-shrink-0"
            >
              <img 
                src={item.img} 
                className="w-40 h-52 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg group-hover:-translate-y-2" 
                alt={item.label} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-bold">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}