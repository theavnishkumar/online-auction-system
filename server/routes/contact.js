import express from "express";
const contactRouter=express.Router();
import {handleSendMessage} from "../controllers/contact.controller.js"

contactRouter.post("/", handleSendMessage)

export default contactRouter;