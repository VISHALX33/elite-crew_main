// models/ServiceOrder.js
import mongoose from 'mongoose';

const serviceOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paidViaWallet: { type: Boolean, default: false },
  paymentMethod: {
    type: String,
    enum: ['wallet', 'phonepe', 'pending'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  transactionId: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('ServiceOrder', serviceOrderSchema);
