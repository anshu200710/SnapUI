// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, ThemeContext } from '../context/AuthContext.jsx';
import { LogOut, User, Home as HomeIcon, Bot, Star, Upload, Menu } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-300 
      bg-white/80 border-gray-100 dark:bg-black/80 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        
        {/* Left Side: Logo & Primary Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SnapUI
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/explore" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition">Explore</Link>
            <Link to="/ai-studio" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-pink-500 transition">
              <Bot size={16}/> AI Studio
            </Link>
            {user?.role === 'creator' && (
              <Link to="/dashboard" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition">
                <Star size={16}/> Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Right Side: Actions & Theme Toggle */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-sm">
                  <User size={14} /> <span className="font-medium">{user.username}</span>
                </div>
                <button onClick={() => { logout(); navigate('/'); }} 
                  className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                  <LogOut size={16}/> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-100 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition">
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          <button className="md:hidden text-gray-600 dark:text-gray-300">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}