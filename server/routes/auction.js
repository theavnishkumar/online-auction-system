import express from 'express';
// import multer from 'multer';
import { createAuction, showAuction } from '../controllers/auction.controller.js';
import upload from '../middleware/multer.js';

// const upload = multer({ dest: 'uploads/' });

const auctionRouter = express.Router();

auctionRouter.post('/create', upload.single('itemPhoto'), createAuction);
auctionRouter.get('/show', showAuction)

export default auctionRouter;