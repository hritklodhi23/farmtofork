import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import healthRouter from "./routes/health";
import { notFound, errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env["PORT"] ?? 5000;

// Middleware
app.use(cors({ origin: process.env["CLIENT_URL"] ?? "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/health", healthRouter);

// Error handling (must come after routes)
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
