import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});