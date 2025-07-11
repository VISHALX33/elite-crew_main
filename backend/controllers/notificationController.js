import Notification from '../models/Notification.js';

// @desc    Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { user, title, message } = req.body;

    const newNotification = await Notification.create({
      user,
      title,
      message,
    });

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification', error });
  }
};

// @desc    Get all notifications for logged-in user
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error });
  }
};

// @desc    Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    // Ensure the notification belongs to current user
    if (String(notification.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark as read', error });
  }
};

// @desc    Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    // Ensure the notification belongs to current user
    if (String(notification.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await notification.deleteOne();
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification', error });
  }
};
