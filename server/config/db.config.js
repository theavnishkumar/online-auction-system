import mongoose from "mongoose";
import { env } from "../config/env.config.js";

const MONGO_URI = env.mongo_uri;

if (!MONGO_URI) {
  console.error("MongoDB connection URI is not defined in environment variables.");
  process.exit(1);
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log("MongoDB Connected");
  return cached.conn;
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log("Error disconnecting from MongoDB", error);
    process.exit(1);
  }
};
