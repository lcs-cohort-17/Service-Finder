import { useAuthContext } from "../context/AuthContext";

/*
========================================================

Authentication Hook

Responsibilities

✔ Expose authentication context
✔ Keep components independent from AuthContext
✔ Provide a single import for authentication

Future developers:

If the authentication implementation changes,
components should continue importing useAuth()
without modification.

========================================================
*/

export function useAuth() {

    return useAuthContext();

}