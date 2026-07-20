import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// NOTE: userRoutes.js and serviceRoutes.js are currently empty stubs (no
// default export yet) — importing them crashes the server on startup.
// Commented out until those tickets are filled in; uncomment once ready.
// import userRoutes from './routes/userRoutes.js';
// import serviceRoutes from './routes/serviceRoutes.js';
import directionsRoutes from './routes/directionsRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.use('/api/directions', directionsRoutes);

// Centralized error handler — must be registered last, after all routes.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
