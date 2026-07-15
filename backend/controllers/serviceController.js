import { getDeclinedServicesDb, getPendingServicesDb,getApprovedServicesDb, saveUserServiceDb } from "../models/serviceModel.js";

export const submitService = async (req, res, next) => {
  try {
    const { name, category, coordinates, address } = req.body;

    const serviceData = {
      name: name.trim(),
      category: category,
      coordinates: { latitude: coordinates.latitude, longitude: coordinates.longitude },
      address: address || 'Address not provided',
      status: 'pending',
      source: 'user_submission',
      createdAt: new Date().toISOString(),
      submittedBy: req.user ? req.user.email : 'anonymous'
    };

    const newService = await saveUserServiceDb(serviceData);

    res.status(201).json({
      success: true,
      message: "Service submitted successfully and is pending review.",
      data: newService
    });
  } catch (error) {
    next(error);
  }
};

// :white_check_mark: NEW: Get pending services (Admin only)
export const getPendingServices = async (req, res, next) => {
  try {
    const limitAmount = parseInt(req.query.limit, 10) || 50; // Default 50 for moderation queue

    const services = await getPendingServicesDb(limitAmount);

    res.status(200).json({
      success: true,
      count: services.length,
      services: services
    });

  } catch (error) {
    next(error);
  }
};

// :white_check_mark: NEW: Get declined/rejected services (Admin only)
export const getDeclinedServices = async (req, res, next) => {
  try {
    const limitAmount = parseInt(req.query.limit, 10) || 20;

    const services = await getDeclinedServicesDb(limitAmount);

    res.status(200).json({
      success: true,
      count: services.length,
      services: services
    });

  } catch (error) {
    next(error);
  }
};

// ✅ Get approved services (Admin only)
export const getApprovedServices = async (req, res, next) => {
  try {
    const limitAmount = parseInt(req.query.limit, 10) || 20;

    console.log("Limit received:", limitAmount);

    const services = await getApprovedServicesDb(limitAmount);

    res.status(200).json({
      success: true,
      count: services.length,
      services
    });

  } catch (error) {
    next(error);
  }
};