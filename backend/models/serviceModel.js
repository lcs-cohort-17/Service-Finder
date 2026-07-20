import { db } from "../config/firebase.js";
// --- Add these constants at the top of the file ---
    const cacheTtlMs = Number(process.env.SERVICE_CACHE_TTL_MS || 5 * 60 * 1000); // 5 min default
    const serviceLimit = Number(process.env.SERVICE_LIMIT || 15);
    const cache = new Map(); // In-memory cache

export const getApprovedServicesWithBounds = async ({
  minLat,
  maxLat,
  minLng,
  maxLng,
}) => {
  // 1. Build cache key from the bounds
  const cacheKey = `${minLat}-${maxLat}-${minLng}-${maxLng}`;

  // 2. Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data; // Return cached data (plain objects)
  }

  // 3. Fetch from Firestore (no bounds in query, just status filter)
  const snapshot = await db
    .collection('services')
    .where('status', '==', 'approved')
    .limit(serviceLimit)
    .get();

  // 4. Convert to plain objects (no class)
  const allServices = [];
  snapshot.forEach(doc => {
    allServices.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  // 5. Filter by bounding box (client-side filtering)
  const filteredServices = allServices.filter(service => {
    const lat = service.coordinates?.latitude;
    const lng = service.coordinates?.longitude;
    return (
      lat >= minLat &&
      lat <= maxLat &&
      lng >= minLng &&
      lng <= maxLng
    );
  });

  // 6. Store in cache
  cache.set(cacheKey, {
    data: filteredServices,
    expiresAt: Date.now() + cacheTtlMs,
  });

  return filteredServices;
};

/**
 * Listen for realtime updates within the current map bounds.
 */
export const subscribeToApprovedServices = (
  { minLat, maxLat, minLng, maxLng },
  callback,
) => {
  return db
    .collection('services')
    .where('status', '==', 'approved')
    .limit(serviceLimit)
    .onSnapshot(
      (snapshot) => {
        // Convert to plain objects
        const allServices = [];
        snapshot.forEach(doc => {
          allServices.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        // Filter by bounds
        const filteredServices = allServices.filter(service => {
          const lat = service.coordinates?.latitude;
          const lng = service.coordinates?.longitude;
          return (
            lat >= minLat &&
            lat <= maxLat &&
            lng >= minLng &&
            lng <= maxLng
          );
        });

        callback(filteredServices);
      },
      (error) => {
        console.error('Realtime listener error:', error);
      },
    );
};


export const saveUserServiceDb = async (serviceData) => {
  const newDocRef = db.collection('services').doc();
  await newDocRef.set(serviceData);
  return { id: newDocRef.id, ...serviceData };
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

export const seedFromOverpassDb = async (servicesData) => {
  let batch = db.batch();
  let operationCount = 0;
  let savedCount = 0;

  for (const service of servicesData) {
    const docRef = db.collection('services').doc(service.id);
    batch.set(docRef, service, { merge: true });
    operationCount++;
    savedCount++;

    if (operationCount === 500) {
      await batch.commit();
      batch = db.batch();
      operationCount = 0;
    }
  }

  if (operationCount > 0) {
    await batch.commit();
  }

  return savedCount;
};

export const updateServiceStatusDb = async (id, status, reviewedAt) => {
  const docRef = db.collection('services').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    const error = new Error("Service not found");
    error.code = "NOT_FOUND";
    throw error;
  }

  await docRef.update({ status, reviewedAt });
  return { id, status };
};

// models/serviceModel.js

// ✅ Get current user's PENDING suggestions
export const getUserPendingServicesDb = async (email, limitAmount = 20) => {
  const snapshot = await db
    .collection('services')
    .where('status', '==', 'pending')
    .where('submittedBy', '==', email)
    .orderBy('createdAt', 'desc')
    .limit(limitAmount)
    .get();

  const services = [];
  snapshot.forEach(doc => {
    services.push({ id: doc.id, ...doc.data() });
  });
  return services;
};

// ✅ Get current user's APPROVED suggestions
export const getUserApprovedServicesDb = async (email, limitAmount = 20) => {
  const snapshot = await db
    .collection('services')
    .where('status', '==', 'approved')
    .where('submittedBy', '==', email)
    .orderBy('createdAt', 'desc')
    .limit(limitAmount)
    .get();

  const services = [];
  snapshot.forEach(doc => {
    services.push({ id: doc.id, ...doc.data() });
  });
  return services;
};

// ✅ Get current user's DECLINED suggestions
export const getUserDeclinedServicesDb = async (email, limitAmount = 20) => {
  const snapshot = await db
    .collection('services')
    .where('status', '==', 'declined')
    .where('submittedBy', '==', email)
    .orderBy('reviewedAt', 'desc')
    .limit(limitAmount)
    .get();

  const services = [];
  snapshot.forEach(doc => {
    services.push({ id: doc.id, ...doc.data() });
  });
  return services;
};
