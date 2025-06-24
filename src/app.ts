import express from "express";
import bookingRoutes from "./routes/bookingRoutes";
import { authMiddleware } from "./auth/auth";

const app = express();

app.use(express.json());

// Routes

/// API Endpoint
app.use("/api", authMiddleware);
app.use("/api/bookings", bookingRoutes);

export default app;
