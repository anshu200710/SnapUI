// service.js
// Main entry point for UIForge backend
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import componentRoutes from './routes/componentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import AIrouter from './routes/aiRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/ai', AIrouter);

// Health check
app.get('/', (req, res) => res.send('UIForge API running'));

// Error handler (should be last)
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
