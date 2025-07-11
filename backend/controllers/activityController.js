import ActivityLog from '../models/activitylog.js';
import User from '../models/user.js';

export const getAllLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email role');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
