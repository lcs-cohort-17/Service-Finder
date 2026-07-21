import { useEffect, useMemo, useState } from "react";

import adminService, {

    AdminSuggestion,

} from "../services/adminService";

function useAdmin() {

    const [

        suggestions,

        setSuggestions,

    ] = useState<AdminSuggestion[]>([]);

    useEffect(() => {

        adminService

            .getPendingSuggestions()

            .then(setSuggestions);

    }, []);

    const pendingCount = useMemo(() => {

        return suggestions.length;

    }, [suggestions]);

    return {

        suggestions,

        pendingCount,

    };

}

export default useAdmin;