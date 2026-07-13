// backend/models/serviceModel.js

import { db } from "../config/firebase.js";
import Service from "./Service.js";

const cacheTtlMs = Number(process.env.SERVICE_CACHE_TTL_MS || 5 * 60 * 1000);
const serviceLimit = Number(process.env.SERVICE_LIMIT || 0);

let approvedServicesCache = null;
let approvedServicesCacheExpiresAt = 0;

/**
 * Fetch all approved services.
 */
export const getApprovedServices = async () => {
    try {
        if (approvedServicesCache && Date.now() < approvedServicesCacheExpiresAt) {
            return approvedServicesCache;
        }

        let servicesQuery = db
            .collection("services")
            .where("status", "==", "approved");

        if (serviceLimit > 0) {
            servicesQuery = servicesQuery.limit(serviceLimit);
        }

        const snapshot = await servicesQuery.get();

        const services = snapshot.docs.map(
            (doc) =>
                new Service({
                    id: doc.id,
                    ...doc.data(),
                })
        );

        approvedServicesCache = services;
        approvedServicesCacheExpiresAt = Date.now() + cacheTtlMs;

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
