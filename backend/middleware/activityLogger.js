// backend/middleware/activityLogger.js
import { createLog } from '../utils/activityUtils.js';

export const activityLogger = async (req, res, next) => {
  if (req.user) {
    await createLog({
      user: req.user._id,
      action: `${req.method} ${req.originalUrl}`,
    });
  }
  next();
};
