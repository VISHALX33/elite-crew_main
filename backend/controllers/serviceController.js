// controllers/serviceController.js
import Service from '../models/Service.js';

export const createService = async (req, res) => {
  try {
    const { title, category, description, price, gstPercent, tdsPercent, type } = req.body;

    // multer will attach the uploaded file to req.file
    const imagePath = req.file?.path || '';

    const service = await Service.create({
      title,
      category,
      description,
      price,
      gstPercent,
      tdsPercent,
      type,
      image: imagePath,
      createdBy: req.user._id,
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('❌ Failed to create service:', error);
    res.status(500).json({ message: 'Service creation failed' });
  }
};


export const getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};

export const getServiceCategories = async (req, res) => {
  const categories = await Service.distinct('category');
  res.json(categories);
};

export const getServicesByCategory = async (req, res) => {
  const services = await Service.find({ category: req.params.cat });
  res.json(services);
};

export const getAllFreeServices = async (req, res) => {
  try {
    const services = await Service.find({ type: 'free' }); // only free services
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

// Get All Services (filter by type)
export const getAllServices = async (req, res) => {
  const { type } = req.query;
  const filter = type ? { type } : {};
  const services = await Service.find(filter);
  res.json(services);
};
