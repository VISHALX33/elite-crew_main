import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  adhar: { type: String },
  image: { type: String, default: '' },
  address: { type: String },
  dob: { type: String },        // 📅 Date of Birth
  gender: { type: String },     // ⚧ Gender
  about: { type: String },      // 📝 About Me
  isAdmin: { type: Boolean, default: false },
  user_uni_id: { type: String, unique: true },
  wallet: { type: Number, default: 9000000 },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
