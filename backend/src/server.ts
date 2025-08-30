import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import businessRoutes from "./routes/business";
import adminRoutes from "./routes/admin";

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://stablespots.xyz",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/businesses", businessRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
