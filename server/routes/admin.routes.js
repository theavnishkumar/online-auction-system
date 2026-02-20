import express from "express";
import {
  getAdminDashboard,
  getAllUsers,
} from "../controllers/admin.controller.js";
import { checkAdmin, secureRoute } from "../middleware/auth.middleware.js";

const adminRoutes = express.Router();
adminRoutes.use(secureRoute);

adminRoutes.get("/dashboard", checkAdmin, getAdminDashboard);
adminRoutes.get("/users", checkAdmin, getAllUsers);

export default adminRoutes;
