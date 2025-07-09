import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
const adminRouter = express.Router();

adminRouter.get('/', checkAdmin, (req, res) => {
    res.send("Hello admin")
})

export default adminRouter;