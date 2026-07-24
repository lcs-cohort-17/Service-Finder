import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import overpassRoutes from './routes/overpassRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/services/overpass', overpassRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
