import express from "express";
import listingRoutes from "./routes/listingRoutes";
import userRoutes from "./routes/userRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(express.json());

// Routes
app.use("/api/listings", listingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
