export interface AdminSuggestion {

    id: string;

    name: string;

    category: string;

    address: string;

    latitude: number;

    longitude: number;

    submittedBy: string;

}

const mockSuggestions: AdminSuggestion[] = [

    {

        id: "1",

        name: "Durban Central Clinic",

        category: "Clinic",

        address: "45 Smith Street",

        latitude: -29.8587,

        longitude: 31.0218,

        submittedBy: "Jose",

    },

    {

        id: "2",

        name: "Community Library",

        category: "Library",

        address: "18 Victoria Street",

        latitude: -29.8554,

        longitude: 31.0272,

        submittedBy: "Alice",

    },

];

async function getPendingSuggestions() {

    return Promise.resolve(mockSuggestions);

}

async function approveSuggestion(id: string) {

    console.info(

        `[ADMIN-011] Approved suggestion ${id}`

    );

    return Promise.resolve(true);

}

async function rejectSuggestion(id: string) {

    console.info(

        `[ADMIN-011] Rejected suggestion ${id}`

    );

    return Promise.resolve(true);

}

const adminService = {

    getPendingSuggestions,

    approveSuggestion,

    rejectSuggestion,

};

export default adminService;