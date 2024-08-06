import express from 'express';
// import multer from 'multer';
import createAuction from '../controllers/auction.controller.js';
import upload from '../middleware/multer.js';

// const upload = multer({ dest: 'uploads/' });

const auctionRouter = express.Router();

auctionRouter.post('/create', upload.single('itemPhoto'), createAuction);

export default auctionRouter;