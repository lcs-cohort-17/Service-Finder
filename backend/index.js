import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import directionsRoutes from './routes/directionsRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.use('/api/directions', directionsRoutes);

// Error handler must be registered last, after every route — its four-
// argument signature is what tells Express to treat it as an error
// handler rather than regular middleware.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});