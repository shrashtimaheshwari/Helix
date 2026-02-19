require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const analyzeRoute = require("./routes/analyze");

const app = express();

/* ==============================
   CORS Configuration
============================== */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);

/* ==============================
   Middleware
============================== */
app.use(express.json());

/* ==============================
   Routes
============================== */
app.use("/api/analyze", analyzeRoute);

app.get("/", (req, res) => {
  res.send("Hilix Backend Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ==============================
   404 Handler
============================== */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* ==============================
   Global Error Handler
============================== */
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
});

/* ==============================
   Server Startup
============================== */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    /* Graceful Shutdown */
    process.on("SIGINT", async () => {
      console.log("Shutting down server...");
      await mongoose.connection.close();
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("Startup Error:", error);
    process.exit(1);
  }
};

startServer();
