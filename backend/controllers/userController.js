import User from '../models/User.js';
import Booking from '../models/ServiceOrder.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Blog from '../models/Blog.js';
import Wishlist from '../models/Wishlist.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 🔐 Register New User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    user_uni_id: Date.now().toString(36),
    wallet: 9000000,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      user_uni_id: newUser.user_uni_id,
      wallet: newUser.wallet,
      image: newUser.image,
    }
  });
};

// 🔐 Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      image: user.image,
      user_uni_id: user.user_uni_id,
      wallet: user.wallet,
    }
  });
};

// 👤 Get Profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    name: user.name,
    email: user.email,
    image: user.image,
    user_uni_id: user.user_uni_id,
    phone: user.phone,
    adhar: user.adhar,
    address: user.address,
    wallet: user.wallet,
    dob: user.dob,
    gender: user.gender,
    about: user.about,
  });
};

// ✏️ Update Profile
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.adhar = req.body.adhar || user.adhar;
  user.image = req.body.image || user.image;
  user.address = req.body.address || user.address;
  user.dob = req.body.dob || user.dob;
  user.gender = req.body.gender || user.gender;
  user.about = req.body.about || user.about;

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  const updatedUser = await user.save();
  res.json({
    name: updatedUser.name,
    email: updatedUser.email,
    image: updatedUser.image,
    user_uni_id: updatedUser.user_uni_id,
    phone: updatedUser.phone,
    adhar: updatedUser.adhar,
    address: updatedUser.address,
    wallet: updatedUser.wallet,
    dob: updatedUser.dob,
    gender: updatedUser.gender,
    about: updatedUser.about,
  });
};

// ❌ Delete Account
export const deleteAccount = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.deleteOne();
  res.json({ message: 'User account deleted' });
};

export const getActivityOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    const [bookings, orders, reviews, blogs, wishlist] = await Promise.all([
      Booking.countDocuments({ user: userId }),
      Order.countDocuments({ user: userId }),
      Review.countDocuments({ user: userId }),
      Blog.countDocuments({ createdBy: userId }),
      Wishlist.findOne({ user: userId }) // optional
    ]);

    res.json({
      totalServicesBooked: bookings,
      totalProductsPurchased: orders,
      reviewsGiven: reviews,
      blogsPosted: blogs,
      wishlistItems: wishlist?.items?.length || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity overview' });
  }
};