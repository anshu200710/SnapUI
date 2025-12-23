// src/components/DarkModeToggle.jsx
import React, { useContext, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/AuthContext.jsx';

export default function DarkModeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  // Sync Tailwind's 'dark' class with the context state
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:ring-2 ring-blue-400 outline-none"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <Sun size={20} strokeWidth={2.5} />
      ) : (
        <Moon size={20} strokeWidth={2.5} />
      )}
    </button>
  );
}