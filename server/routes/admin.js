import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { getAdminDashboard, getAllUsers } from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.get('/dashboard', checkAdmin, getAdminDashboard);
adminRouter.get('/users', checkAdmin, getAllUsers);

export default adminRouter;