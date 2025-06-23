import express from "express";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(express.json());

// Routes

app.use("/api/bookings", bookingRoutes);

export default app;
