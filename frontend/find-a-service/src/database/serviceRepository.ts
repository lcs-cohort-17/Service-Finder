import { db, CachedService } from "./db";

const CACHE_KEY = "services";
const CACHE_DURATION = 72 * 60 * 60 * 1000; // 72 hours

export const serviceRepository = {
    async getCachedServices(): Promise<CachedService[] | null> {
        const metadata = await db.metadata.get(CACHE_KEY);

        if (!metadata) {
            return null;
        }

        const expired =
            Date.now() - metadata.lastUpdated > CACHE_DURATION;

        if (expired) {
            return null;
        }

        return await db.services.toArray();
    },

    async cacheServices(services: CachedService[]) {
        await db.transaction(
            "rw",
            db.services,
            db.metadata,
            async () => {
                await db.services.clear();

                await db.services.bulkPut(services);

                await db.metadata.put({
                    key: CACHE_KEY,
                    lastUpdated: Date.now(),
                });
            }
        );
    },

    async clearCache() {
        await db.services.clear();
        await db.metadata.clear();
    },

    async cacheAge() {
        const metadata = await db.metadata.get(CACHE_KEY);

        if (!metadata) {
            return null;
        }

        return Date.now() - metadata.lastUpdated;
    },

    async hasCache(): Promise<boolean> {
    const metadata = await db.metadata.get(CACHE_KEY);
    return !!metadata;
},

async isCacheExpired(): Promise<boolean> {
    const metadata = await db.metadata.get(CACHE_KEY);

    if (!metadata) {
        return true;
    }

    return Date.now() - metadata.lastUpdated > CACHE_DURATION;
},
};