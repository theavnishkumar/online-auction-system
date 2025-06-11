import express from 'express';
import { createAuction, showAuction, auctionById, placeBid, dashboardData, myAuction } from '../controllers/auction.controller.js';
import upload from '../middleware/multer.js';

const auctionRouter = express.Router();

auctionRouter
    .get('/stats', dashboardData)

auctionRouter
    .get('/', showAuction)
    .post('/', upload.single('itemPhoto'), createAuction);

auctionRouter
.get("/myauction", myAuction)

auctionRouter
    .get('/:id', auctionById)
    .post('/:id', placeBid)


export default auctionRouter;