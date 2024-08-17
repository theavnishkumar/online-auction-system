import express from 'express';
// import multer from 'multer';
import { createAuction, showAuction, auctionById, updateAuctionById } from '../controllers/auction.controller.js';
import upload from '../middleware/multer.js';

// const upload = multer({ dest: 'uploads/' });

const auctionRouter = express.Router();

auctionRouter.post('/create', upload.single('itemPhoto'), createAuction);
auctionRouter.get('/show', showAuction)
auctionRouter.get('/:id', auctionById)
auctionRouter.post('/:id', updateAuctionById)

export default auctionRouter;