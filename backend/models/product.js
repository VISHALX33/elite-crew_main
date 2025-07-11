import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // URL of product image
  gstPercent: { type: Number, default: 18 },
  tdsPercent: { type: Number, default: 10 },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
