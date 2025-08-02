import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { getAdminDashboard } from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.get('/dashboard', checkAdmin, getAdminDashboard);

export default adminRouter;