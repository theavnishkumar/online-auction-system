import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token, role) => {
    return jwt.verify(token, JWT_SECRET)
}