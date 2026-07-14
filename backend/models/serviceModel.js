import { db } from "../config/firebase.js";

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

