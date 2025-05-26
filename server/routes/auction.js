import express from 'express';
// import multer from 'multer';
import { createAuction, showAuction, auctionById, placeBid } from '../controllers/auction.controller.js';
import upload from '../middleware/multer.js';

// const upload = multer({ dest: 'uploads/' });

const auctionRouter = express.Router();

auctionRouter.post('/create', upload.single('itemPhoto'), createAuction);
auctionRouter.get('/', showAuction)
auctionRouter.get('/:id', auctionById)
auctionRouter.post('/:id', placeBid)

export default auctionRouter;