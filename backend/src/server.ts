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
    origin: ["https://stablespots.xyz", "https://www.stablespots.xyz", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/businesses", businessRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
