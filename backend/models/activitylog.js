import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);
