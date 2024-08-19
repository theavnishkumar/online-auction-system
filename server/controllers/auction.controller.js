import uploadImage from '../services/cloudinaryService.js';
import Product from '../models/product.js';


const createAuction = async (req, res) => {
    try {
        const { itemName, itemPrice, itemDescription, itemCategory, itemStartDate, itemEndDate, seller } = req.body;
        let imageUrl = '';

        if (req.file) {
            try {
                console.log(req.file);
                imageUrl = await uploadImage(req.file);
            } catch (error) {
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
            }
        }

        const newAuction = new Product({
            itemName,
            itemPrice,
            itemDescription,
            itemCategory,
            itemPhoto: imageUrl,
            itemStartDate,
            itemEndDate,
            seller,
        });
        await newAuction.save();

        res.status(201).json({ message: 'Auction created successfully', newAuction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating auction', error: error.message });
    }
};

const showAuction = async (req, res) => {
    try {
        const auctions = await Product.find().sort({ createdAt: -1 }).populate('seller', '_id name');
        return res.status(200).json({ message: 'All auctions', auctions });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching auctions', error: error.message });
    }
}

const auctionById = async (req, res) => {
    try {
        const auction = await Product.findById(req.params.id).populate('seller', '_id name createdAt').populate({
            path: 'bids.bidder',
            select: 'name'
        });
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        return res.status(200).json({ message: 'Auction found', auction });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching auction', error: error.message });
    }
}

const updateAuctionById = async (req, res) => {
    try {
        const { bid, bidder } = req.body;
        const auction = await Product.findById(req.params.id);

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        // Check if the auction has ended
        if (auction.itemEndDate < Date.now()) {
            return res.status(400).json({ message: 'Auction has ended' });
        }

        // Ensure the new bid is higher than the current highest bid
        if (auction.itemPrice >= bid) {
            return res.status(400).json({ message: 'Bid must be greater than current price' });
        }

        // Find the existing bid by the same bidder
        const existingBidIndex = auction.bids.findIndex(
            (b) => b.bidder.toString() === bidder.toString()
        );

        if (existingBidIndex !== -1) {
            // Update the existing bid
            auction.bids[existingBidIndex].bid = bid;
            auction.bids[existingBidIndex].time = Date.now();
        } else {
            // Add a new bid if none exists
            auction.bids.push({ bidder, bid, time: Date.now() });
        }

        // Update the auction's current price
        auction.itemPrice = bid;

        // Save the auction with the updated bid or new bid
        await auction.save();

        return res.status(200).json({ message: 'Auction updated successfully', auction });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating auction', error: error.message });
    }
};

export { createAuction, showAuction, auctionById, updateAuctionById };