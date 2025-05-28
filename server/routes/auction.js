import express from 'express';
// import multer from 'multer';
import { createAuction, showAuction, auctionById, placeBid, dashboardData } from '../controllers/auction.controller.js';
import upload from '../middleware/multer.js';

// const upload = multer({ dest: 'uploads/' });

const auctionRouter = express.Router();

auctionRouter
    .get('/stats', dashboardData)

auctionRouter
    .get('/', showAuction)
    .post('/', upload.single('itemPhoto'), createAuction);

auctionRouter
    .get('/:id', auctionById)
    .post('/:id', placeBid)


export default auctionRouter;