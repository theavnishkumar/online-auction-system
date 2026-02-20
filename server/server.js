import { app } from "./app.js";
import { env } from "./config/env.config.js";
import { connectDB, disconnectDB } from "./config/db.config.js";

const PORT = env.port;

let server;
let isShuttingDown = false;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, async () => {
      console.log(
        `Server is running on port ${PORT} in ${env.node_env} environment`,
      );
    });

    server.on("error", (err) => {
      console.error("Server error:", err.message);
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Please free the port and try again.`,
        );
      }
      gracefulShutdown("SERVER_ERROR");
    });
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  if (server && server.listening) {
    server.close(async (err) => {
      if (err) {
        console.error("Error closing server:", err.message);
      } else {
        console.log("HTTP server closed");
      }
      await cleanupAndExit();
    });

    // Force close after timeout
    setTimeout(() => {
      console.error("Forcing shutdown after timeout");
      process.exit(1);
    }, 10000);
  } else {
    // Server not running, just cleanup
    await cleanupAndExit();
  }
};

const cleanupAndExit = async () => {
  try {
    console.log("Closing MongoDB connection...");
    await disconnectDB();
    console.log("MongoDB connection closed");
    console.log("Server shut down gracefully");
    process.exit(0);
  } catch (dbErr) {
    console.error("Error disconnecting from MongoDB:", dbErr.message);
    process.exit(1);
  }
};

// Global error handlers

// Promise rejections
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  gracefulShutdown("unhandledRejection");
});

// Synchronous crashes
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
  gracefulShutdown("uncaughtException");
});

// Signal Handlers

// Ctrl + C
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Docker / PM2
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

(async () => {
  await startServer();
})();
