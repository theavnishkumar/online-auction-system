import express from "express";
import {
  createAuction,
  showAuction,
  auctionById,
  placeBid,
  dashboardData,
  myAuction,
} from "../controllers/auction.controller.js";
import upload from "../middleware/multer.js";
import { secureRoute } from "../middleware/auth.middleware.js";

const auctionRoutes = express.Router();
auctionRoutes.use(secureRoute);

auctionRoutes.get("/stats", dashboardData);

auctionRoutes
  .route("/")
  .get(showAuction)
  .post(upload.single("itemPhoto"), createAuction);

auctionRoutes.get("/myauction", myAuction);

auctionRoutes.route("/:id").get(auctionById).post(placeBid);

export default auctionRoutes;
