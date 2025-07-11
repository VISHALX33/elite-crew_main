// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import serviceOrderRoutes from './routes/serviceOrderRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
import path from 'path';

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));


// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-orders', serviceOrderRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/payments', paymentRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(process.env.PORT || 8000, () =>
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 8000}`)
  );
})
.catch((err) => console.error('❌ MongoDB Connection Failed:', err));
