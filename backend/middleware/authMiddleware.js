// where you generate tokens
import { getAuth } from "firebase-admin/auth";

export const authMiddleware = async (req, res, next) => {
    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing."
            });
        }

        // Remove "Bearer "
        const idToken = authHeader.split("Bearer ")[1];

        // Verify Firebase token
        const decodedToken = await getAuth().verifyIdToken(idToken);

        // Attach user to request
        req.user = {
            user_id: decodedToken.uid,
            email: decodedToken.email
        };

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized.",
            error: error.message
        });

    }
};