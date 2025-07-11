import Review from '../models/review.js';
import Service from '../models/service.js';

// @desc    Add a review for a service
export const addReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      service: serviceId
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this service.' });
    }

    const review = new Review({
      user: req.user._id,
      service: serviceId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get reviews for a specific service
export const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate('user', 'name');

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
