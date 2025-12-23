// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { LogOut, User, Home as HomeIcon, Upload as UploadIcon, Star, Bot } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2 flex items-center justify-between shadow transition-colors">
      <div className="flex items-center gap-4">
        <DarkModeToggle />
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          <HomeIcon size={22} /> UIForge
        </Link>
        <Link to="/explore" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-medium">Explore</Link>
        <Link to="/ai-studio" className="text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-medium flex items-center gap-1"><Bot size={18}/>AI Studio</Link>
        {user?.role === 'creator' && (
          <>
            <Link to="/upload" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-medium flex items-center gap-1"><UploadIcon size={18}/>Upload</Link>
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 font-medium flex items-center gap-1"><Star size={18}/>Dashboard</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-800 dark:text-gray-300 flex items-center gap-1"><User size={18}/>{user.username}</span>
            <button onClick={handleLogout} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-600 flex items-center gap-1"><LogOut size={18}/>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-medium">Login</Link>
            <Link to="/register" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-medium">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
