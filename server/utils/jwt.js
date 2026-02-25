import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, env.jwt_secret, {
    expiresIn: env.jwt_expires_in,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.jwt_secret);
};
