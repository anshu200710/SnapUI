// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Theme context for global dark/light mode
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);

  // Set axios baseURL (optional, adjust to your backend)
  axios.defaults.baseURL = 'http://localhost:5000';

  // Attach token to axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Helper: return headers with token
  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      return res.data.user;
    } catch (err) {
      throw err.response?.data?.message || 'Login failed';
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (username, email, password, role = 'user') => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', { username, email, password, role });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      return res.data.user;
    } catch (err) {
      throw err.response?.data?.message || 'Register failed';
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  // Fetch components
  const fetchComponents = async (filters = {}) => {
    try {
      const res = await axios.get('/api/components', { params: filters });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'Fetch failed';
    }
  };

  // Upload component
  const uploadComponent = async (data) => {
    try {
      const res = await axios.post('/api/components', data, { headers: authHeaders() });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'Upload failed';
    }
  };

  // Download component
  const downloadComponent = async (id) => {
    try {
      const res = await axios.get(`/api/components/${id}/download`, { responseType: 'blob', headers: authHeaders() });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'Download failed';
    }
  };

  // Fetch single component
  const fetchComponent = async (id) => {
    try {
      const res = await axios.get(`/api/components/${id}`);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'Fetch component failed';
    }
  };

  // Reviews
  const fetchReviews = async (componentId) => {
    try {
      const res = await axios.get(`/api/reviews/${componentId}`);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'Fetch reviews failed';
    }
  };

  const submitReview = async (componentId, rating, reviewText) => {
    try {
      const res = await axios.post(`/api/reviews/${componentId}`, { rating, review: reviewText }, { headers: authHeaders() });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'Submit review failed';
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      fetchComponents,
      fetchComponent,
      fetchReviews,
      submitReview,
      uploadComponent,
      downloadComponent,
      authHeaders,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
