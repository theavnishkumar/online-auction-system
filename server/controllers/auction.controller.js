import uploadImage from '../services/cloudinaryService.js';
import Product from '../models/product.js';
import mongoose from "mongoose"
import { connectDB } from '../connection.js'


export const createAuction = async (req, res) => {
    try {
        await connectDB();
        const { itemName, startingPrice, itemDescription, itemCategory, itemStartDate, itemEndDate } = req.body;
        let imageUrl = '';

        if (req.file) {
            try {
                imageUrl = await uploadImage(req.file);
            } catch (error) {
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
            }
        }

        const start = itemStartDate ? new Date(itemStartDate) : new Date();
        const end = new Date(itemEndDate);
        if (end <= start) {
            return res.status(400).json({ message: 'Auction end date must be after start date' });
        }

        const newAuction = new Product({
            itemName,
            startingPrice,
            currentPrice: startingPrice,
            itemDescription,
            itemCategory,
            itemPhoto: imageUrl,
            itemStartDate: start,
            itemEndDate: end,
            seller: req.user.id,
        });
        await newAuction.save();

        res.status(201).json({ message: 'Auction created successfully', newAuction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating auction', error: error.message });
    }
};

export const showAuction = async (req, res) => {
    try {
        await connectDB();
        const auction = await Product.find({ itemEndDate: { $gt: new Date() } })
            .populate("seller", "name")
            .select("itemName itemDescription currentPrice bids itemEndDate itemCategory itemPhoto seller")
            .sort({ createdAt: -1 });
        const formatted = auction.map(auction => ({
            _id: auction._id,
            itemName: auction.itemName,
            itemDescription: auction.itemDescription,
            currentPrice: auction.currentPrice,
            bidsCount: auction.bids.length,
            timeLeft: Math.max(0, new Date(auction.itemEndDate) - new Date()),
            itemCategory: auction.itemCategory,
            sellerName: auction.seller.name,
            itemPhoto: auction.itemPhoto,
        }));

        res.status(200).json(formatted);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching auctions', error: error.message });
    }
}

export const auctionById = async (req, res) => {
    try {
        await connectDB();
        const { id } = req.params;
        const auction = await Product.findById(id)
            .populate("seller", "name")
            .populate("bids.bidder", "name");
        auction.bids.sort((a, b) => new Date(b.bidTime) - new Date(a.bidTime));
        res.status(200).json(auction);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching auctions', error: error.message });
    }
}

export const placeBid = async (req, res) => {
    try {
        await connectDB();
        const { bidAmount } = req.body;
        const user = req.user.id;
        const { id } = req.params;

        const product = await Product.findById(id).populate('bids.bidder', "name");
        if (!product) return res.status(404).json({ message: "Auction not found" });

        if (new Date(product.itemEndDate) < new Date()) return res.status(400).json({ message: "Auction has already ended" });

        const minBid = Math.max(product.currentPrice, product.startingPrice) + 1;
        const maxBid = Math.max(product.currentPrice, product.startingPrice) + 10;
        if (bidAmount < minBid) return res.status(400).json({ message: `Bid must be at least Rs ${minBid}` })
        if (bidAmount > maxBid) return res.status(400).json({ message: `Bid must be at max Rs ${maxBid}` })

        product.bids.push({
            bidder: user,
            bidAmount: bidAmount,
        })

        product.currentPrice = bidAmount;
        await product.save();
        res.status(200).json({ message: "Bid placed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error placing bid", error: error.message })
    }
}

export const dashboardData = async (req, res) => {
    try {
        await connectDB();
        const userObjectId = new mongoose.Types.ObjectId(req.user.id);
        const dateNow = new Date();
        const stats = await Product.aggregate([
            {
                $facet: {
                    totalAuctions: [{ $count: "count" }],
                    userAuctionCount: [{ $match: { seller: userObjectId } }, { $count: "count" }],
                    activeAuctions: [
                        { $match: { itemStartDate: { $lte: dateNow }, itemEndDate: { $gte: dateNow } } },
                        { $count: "count" }
                    ]
                }
            }
        ]);

        const totalAuctions = stats[0].totalAuctions[0]?.count || 0;
        const userAuctionCount = stats[0].userAuctionCount[0]?.count || 0;
        const activeAuctions = stats[0].activeAuctions[0]?.count || 0;

        const globalAuction = await Product.find({ itemEndDate: { $gt: dateNow } }).populate("seller", "name").sort({ createdAt: -1 }).limit(3);;
        const latestAuctions = globalAuction.map(auction => ({
            _id: auction._id,
            itemName: auction.itemName,
            itemDescription: auction.itemDescription,
            currentPrice: auction.currentPrice,
            bidsCount: auction.bids.length,
            timeLeft: Math.max(0, new Date(auction.itemEndDate) - new Date()),
            itemCategory: auction.itemCategory,
            sellerName: auction.seller.name,
            itemPhoto: auction.itemPhoto,
        }));

        const userAuction = await Product.find({ seller: userObjectId }).populate("seller", "name").sort({ createdAt: -1 }).limit(3);
        const latestUserAuctions = userAuction.map(auction => ({
            _id: auction._id,
            itemName: auction.itemName,
            itemDescription: auction.itemDescription,
            currentPrice: auction.currentPrice,
            bidsCount: auction.bids.length,
            timeLeft: Math.max(0, new Date(auction.itemEndDate) - new Date()),
            itemCategory: auction.itemCategory,
            sellerName: auction.seller.name,
            itemPhoto: auction.itemPhoto,
        }));

        return res.status(200).json({ totalAuctions, userAuctionCount, activeAuctions, latestAuctions, latestUserAuctions })

    } catch (error) {
        res.status(500).json({ message: "Error getting dashboard data", error: error.message })
    }
}

export const myAuction = async (req, res) => {
    try {
        await connectDB();
        const auction = await Product.find({ seller: req.user.id })
            .populate("seller", "name")
            .select("itemName itemDescription currentPrice bids itemEndDate itemCategory itemPhoto seller")
            .sort({ createdAt: -1 });
        const formatted = auction.map(auction => ({
            _id: auction._id,
            itemName: auction.itemName,
            itemDescription: auction.itemDescription,
            currentPrice: auction.currentPrice,
            bidsCount: auction.bids.length,
            timeLeft: Math.max(0, new Date(auction.itemEndDate) - new Date()),
            itemCategory: auction.itemCategory,
            sellerName: auction.seller.name,
            itemPhoto: auction.itemPhoto,
        }));

        res.status(200).json(formatted);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching auctions', error: error.message });
    }
}