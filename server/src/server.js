import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.middleware.js";
import transactionsRouter from ".//routes/transactions.route.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/transactions", transactionsRouter);

const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
