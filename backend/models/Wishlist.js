// backend/models/Wishlist.js
import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['service', 'product'], required: true },
  item: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'type' },
}, {
  timestamps: true
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
