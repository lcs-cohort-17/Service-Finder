import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

// 2. Keep the database health check diagnostic connection probe active
app.get("/test", async (req, res) => {
  try {
    const { db } = await import("./config/firebase.js");
        res.json({ status: "ok", db: "connected" });
  } catch (err) {
        res.json({ status: "error", message: err.message });
      }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});