import express from "express";
import { handleSendMessage } from "../controllers/contact.controller.js";
const contactRoutes = express.Router();

contactRoutes.post("/", handleSendMessage);

export default contactRoutes;
