import Dexie, { Table } from "dexie";
// added
export interface CachedService {
    id: string;
    name: string;
    category: string;

    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export interface CacheMetadata {
    key: string;
    lastUpdated: number;
}

class ServiceDatabase extends Dexie {
    services!: Table<CachedService, string>;
    metadata!: Table<CacheMetadata, string>;

    constructor() {
        super("ServiceFinderDB");

        this.version(1).stores({
            services: "id, category",
            metadata: "key",
        });
    }
}

export const db = new ServiceDatabase();