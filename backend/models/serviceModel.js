 import { db } from "../config/firebase.js";

export const saveUserServiceDb = async (serviceData) => {
  const newDocRef = db.collection('services').doc();
  await newDocRef.set(serviceData);
  return { id: newDocRef.id, ...serviceData };
};

// :white_check_mark: NEW: Get pending services (for admin moderation)
export const getPendingServicesDb = async (limitAmount) => {
  let query = db.collection('services')
    .where('status', '==', 'pending')
    .orderBy('createdAt', 'desc'); // Show newest first

  const snapshot = await query.limit(limitAmount).get();

  const services = [];
  snapshot.forEach(doc => {
    services.push({ id: doc.id, ...doc.data() });
  });

  return services;
};

// :white_check_mark: NEW: Get rejected/declined services (for admin audit)
export const getDeclinedServicesDb = async (limitAmount) => {
  let query = db.collection('services')
    .where('status', '==', 'declined')
    .orderBy('reviewedAt', 'desc'); // Show most recently reviewed first

  const snapshot = await query.limit(limitAmount).get();

  const services = [];
  snapshot.forEach(doc => {
    services.push({ id: doc.id, ...doc.data() });
  });

  return services;
};

export const getApprovedServicesDb = async (limitAmount) => {
  const snapshot = await db
    .collection("services")
    .where("status", "==", "approved")
    .limit(limitAmount)
    .get();

  const services = [];

  snapshot.forEach(doc => {
    services.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return services;
};