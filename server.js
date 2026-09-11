const dns = require("dns");
const path = require("path"); // 1. ye add karo

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

require("dotenv").config({ path: path.resolve(__dirname, ".env") }); // 2. ye change karo
console.log("JWT_SECRET Loaded:", process.env.JWT_SECRET); // 3. check ke liye

const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

// Authentication routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

// Server
module.exports = app;