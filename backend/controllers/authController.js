import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Count all existing users
    const userCount = await User.countDocuments();
    const nextUserId = userCount + 1;

    // Format user_uni_id as USE0001, USE0002, etc.
    const user_uni_id = `USE${String(nextUserId).padStart(4, '0')}`;

    const user = await User.create({
      user_id: nextUserId,
      user_uni_id,
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        user_id: user.user_id,
        user_uni_id: user.user_uni_id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Match role as well
    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        user_uni_id: user.user_uni_id,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
