import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import serviceRoutes from './routes/serviceRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Health check
app.get("/test", async (req, res) => {
    try {
        const { db } = await import("./config/firebase.js");

        res.json({
            status: "ok",
            db: "connected",
        });
    } catch (err) {
        res.json({
            status: "error",
            message: err.message,
        });
    }
});

// Service routes 
app.use('/api/services', serviceRoutes);

// Error handling (BEFORE server starts!)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// 404 handler (BEFORE server starts!)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`
  });
});


// Service routes
app.use("/api/services", serviceRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});