import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  type: { type: String, enum: ['free', 'paid'], default: 'free' }, 
  
  gstPercent: { type: Number, default: 18 },
  tdsPercent: { type: Number, default: 10 },
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Service', serviceSchema);