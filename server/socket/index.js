import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { registerAuctionHandlers } from "./auction.handler.js";
import User from "../models/user.model.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.origin,
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Authenticate socket connections using JWT from cookies
  io.use(async (socket, next) => {
    try {
      const cookies = socket.handshake.headers.cookie || "";
      const tokenMatch = cookies.match(/auth_token=([^;]+)/);
      const token = tokenMatch?.[1];

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(token, env.jwt_secret);
      const user = await User.findById(decoded.id).select("name role");
      if (!user) {
        return next(new Error("User not found"));
      }

      // Attach verified user to socket
      socket.user = {
        id: decoded.id,
        name: user.name,
        role: user.role,
      };
      next();
    } catch (error) {
      return next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id} | User: ${socket.user.name}`);

    registerAuctionHandlers(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${socket.id} | Reason: ${reason}`);
    });

    socket.on("error", (err) => {
      console.error(`Socket error: ${socket.id}`, err.message);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initSocket first.");
  }
  return io;
};
