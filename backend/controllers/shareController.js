export const generateShareLink = async (req, res) => {
  try {
    const baseURL = process.env.CLIENT_URL || 'http://localhost:3000';
    const user = req.user;

    const shareLink = `${baseURL}/ref/${user.user_uni_id}`;
    res.json({ message: 'Share link generated', shareLink });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
