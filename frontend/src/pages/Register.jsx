// src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(username, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-white text-center"
      >
        Register
      </motion.h2>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col gap-4">
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="px-4 py-2 rounded bg-gray-800 text-white" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="px-4 py-2 rounded bg-gray-800 text-white" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="px-4 py-2 rounded bg-gray-800 text-white" />
        <select value={role} onChange={e => setRole(e.target.value)} className="px-4 py-2 rounded bg-gray-800 text-white">
          <option value="user">User</option>
          <option value="creator">Creator</option>
        </select>
        <button type="submit" disabled={loading} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition">
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="text-red-400">{error}</div>}
      </form>
    </div>
  );
}
