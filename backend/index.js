require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const workoutRoutes = require("./routes/workout");
const exerciseRoutes = require("./routes/exercise");
const setRoutes = require("./routes/set");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

const origins = [
  "https://gainz-journal.vercel.app"
];

if (process.env.NODE_ENV === "development") {
  origins.push("http://localhost:5173");
}

// Middleware
app.use(
  cors({
    origin: origins,
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

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
