import express from "express";
import bookingRoutes from "./routes/bookingRoutes";
import { authMiddleware } from "./auth/auth";

const app = express();

app.use(express.json());

// Routes

/// API Endpoint

app.use("/gawc", authMiddleware);
app.use("/gawc/bookings/", bookingRoutes);

export default app;
