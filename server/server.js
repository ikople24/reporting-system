// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { clerkMiddleware } from "@clerk/express";
import glideRoutes from "./routes/glideRousts.js";
import migrateRoute from "./routes/migrateRoute.js";
import listProbsRoutes from "./routes/listProbsRoute.js"


import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(clerkMiddleware());

app.use("/api", glideRoutes);
app.use("/api", migrateRoute);

app.use("/api", listProbsRoutes);

// ✅ MongoDB Atlas connect
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connect error:", err));

console.log("typeof glideRoutes:", typeof glideRoutes);
const PORT = 4000;
app.listen(PORT, () => console.log(`Server is run on port ${PORT}`));