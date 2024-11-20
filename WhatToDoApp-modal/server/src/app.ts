import express, { Request, Response } from "express";
import cors from "cors";
import taskRoute from "./routes/taskRoute";
import connectWithRetry from "./config/db";

const app = express();

// Yhdistä MongoDB:n
connectWithRetry();

// Määritetään CORS-asetukset
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Frontendin osoite
    methods: ["GET", "POST", "PUT", "DELETE"], // Salli vain tarvittavat HTTP-metodit
  })
);

// JSON-pyyntöjen käsittely
app.use(express.json());

// Api reitit
app.use("/api", taskRoute);

export default app;
