import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routers/users.js";
import authRoute from "./routers/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import gigRoute from "./routers/gig.js";
import reviewRoute from "./routers/review.js";
import orderRoute from "./routers/order.js";
import conversationRoute from "./routers/conversation.js";
import messageRoute from "./routers/message.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow requests from your frontend
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// Error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).send(errorMessage);
});

// Start the server
app.listen(process.env.PORT || 8800, () => {
    console.log("Server running on port " + (process.env.PORT || 8800));
});
