import ActivityLog from '../models/activityLog.js';

export const createLog = async ({ user, action }) => {
  try {
    await ActivityLog.create({ user, action });
  } catch (error) {
    console.error('Logging failed:', error.message);
  }
};
