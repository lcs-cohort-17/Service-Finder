import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import serviceAccount from './config/serviceAccountKey.json' with {type: 'json'}
import userRoutes  from "./routes/userRoutes.js";
import serviceRoutes  from "./routes/serviceRoutes.js";
import { db } from './config/firebase.js';
import errorHandler from './middleware/errorHandler.js';
const app = express();
app.use(cors());
app.use(express.json());
// Keep this aligned with the frontend's VITE_BACKEND_PORT fallback.
const port = Number(process.env.PORT) || 1818;
// 2. Keep the database health check diagnostic connection probe active
app.get("/test", async (req, res) => {
  try {
    const { db } = await import("./config/firebase.js");
        res.json({ status: "ok", db: "connected" });
  } catch (err) {
        res.json({ status: "error", message: err.message });
      }
});
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Suggested Services API is running."
    });
});
app.get("/firestore-test", async (req, res) => {
    try {
        const doc = await db.collection("test").add({
            message: "hello",
            createdAt: new Date()
        });
        res.json({
            success: true,
            id: doc.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            code: error.code,
            message: error.message
        });
    }
});

console.log("ACTUAL PROJECT IN USE:", serviceAccount.project_id);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




