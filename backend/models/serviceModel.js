import { db } from "../config/firebase.js";
import Service from "./Service.js";

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

// backend/models/serviceModel.js

const cacheTtlMs = Number(process.env.SERVICE_CACHE_TTL_MS || 5 * 60 * 1000);
const serviceLimit = Number(process.env.SERVICE_LIMIT || 0);

// Cache different map areas separately
const cache = new Map();

/**
 * Fetch approved services within the requested map bounds.
 */
export const getApprovedServices = async ({
    minLat,
    maxLat,
    minLng,
    maxLng,
}) => {
    try {
        const cacheKey = `${minLat}-${maxLat}-${minLng}-${maxLng}`;

        const cached = cache.get(cacheKey);

        if (cached && Date.now() < cached.expiresAt) {
            return cached.data;
        }

        const servicesQuery = db
            .collection("services")
            .where("status", "==", "approved");

        const snapshot = await servicesQuery.get();

        // Filter location bounds locally so Firestore does not require a composite index.
        const services = snapshot.docs
            .map(
                (doc) =>
                    new Service({
                        id: doc.id,
                        ...doc.data(),
                    })
            )
            .filter(
                (service) =>
                    service.latitude >= minLat &&
                    service.latitude <= maxLat &&
                    service.longitude >= minLng &&
                    service.longitude <= maxLng
            )
            .slice(0, serviceLimit > 0 ? serviceLimit : undefined);

        cache.set(cacheKey, {
            data: services,
            expiresAt: Date.now() + cacheTtlMs,
        });

        return services;
    } catch (error) {
        console.error("Error fetching approved services:", error);
        throw error;
    }
};

/**
 * Listen for realtime updates.
 */
export const subscribeToApprovedServices = (callback) => {
    return db
        .collection("services")
        .where("status", "==", "approved")
        .onSnapshot(
            (snapshot) => {
                const services = snapshot.docs.map(
                    (doc) =>
                        new Service({
                            id: doc.id,
                            ...doc.data(),
                        })
                );

                callback(services);
            },
            (error) => {
                console.error("Realtime listener error:", error);
            }
        );
};
