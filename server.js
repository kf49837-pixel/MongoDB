const dns = require("dns");
const path = require("path");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://frontend-puce-xi-52.vercel.app",
  "https://mongo-db-ten-drab.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      if (allowedOrigins.includes(origin) || isLocalhost) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
