import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/services', serviceRoutes);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});