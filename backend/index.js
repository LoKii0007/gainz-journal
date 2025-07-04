require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const workoutRoutes = require("./routes/workout");
const exerciseRoutes = require("./routes/exercise");
const setRoutes = require("./routes/set");
const userRoutes = require("./routes/user");
const prisma = require("./utils/prisma");
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Add rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP'
});


const app = express();
const PORT = 5000;

const origins = [
  "https://gainz-journal.vercel.app"
];

if (process.env.NODE_ENV === "development") {
  origins.push("http://localhost:5173");
}

// Middleware
app.use(limiter);
app.use(compression());
app.use(
  cors({
    origin: origins,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get("/test", (req, res) => {
  res.send("backend is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/set", setRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
