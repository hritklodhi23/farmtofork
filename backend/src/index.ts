import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/products';

const app = express();
const PORT = process.env['PORT'] ?? 5000;
const MONGO_URI = process.env['MONGO_URI'] ?? '';

// CORS — allow frontend dev server on localhost:5173
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/products', productRoutes);

// Connect to MongoDB (optional — falls back to in-memory if not set)
async function startServer(): Promise<void> {
  if (MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.warn('⚠️  MongoDB connection failed, using in-memory storage:', err);
    }
  } else {
    console.log('ℹ️  No MONGO_URI set — using in-memory storage');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/health`);
    console.log(`   Products API: http://localhost:${PORT}/api/products`);
  });
}

startServer();
