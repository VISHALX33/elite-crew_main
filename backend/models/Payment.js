import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  transactionId: {
    type: String,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  paymentMethod: {
    type: String,
    enum: ['phonepe', 'wallet'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'cancelled'],
    default: 'pending',
  },
  orderType: {
    type: String,
    enum: ['product', 'service'],
    required: true,
  },
  orderReference: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  phonepeResponse: {
    type: Object,
  },
  callbackUrl: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  merchantTransactionId: {
    type: String,
    unique: true,
  },
  checksum: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema); 