import uploadImage from '../services/cloudinaryService.js';
import Product from '../models/product.js';
import mongoose from "mongoose"


export const createAuction = async (req, res) => {
    try {
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
        const { bidAmount } = req.body;
        const user = req.user.id;
        const { id } = req.params;

        const product = await Product.findById(id).populate('bids.bidder', "name");
        if (!product) return res.status(404).json({ message: "Auction not found" });

        if (new Date(product.itemEndDate) < new Date()) 
            return res.status(400).json({ message: "Auction has already ended" });

        // Check if user is not the seller
        if (product.seller.toString() === user) {
            return res.status(400).json({ message: "Sellers cannot bid on their own items" });
        }

        const minBid = Math.max(product.currentPrice, product.startingPrice) + 1;
        const maxBid = Math.max(product.currentPrice, product.startingPrice) + 10;
        if (bidAmount < minBid) 
            return res.status(400).json({ message: `Bid must be at least Rs ${minBid}` });
        if (bidAmount > maxBid) 
            return res.status(400).json({ message: `Bid must be at max Rs ${maxBid}` });

        // Create new bid object (bidTime will be set automatically by schema default)
        const newBid = {
            bidder: user,
            bidAmount: bidAmount
        };

        // Add new bid to the beginning of array (most recent first)
        product.bids.unshift(newBid);
        product.currentPrice = bidAmount;
        
        await product.save();

        // Re-populate the product to get the updated bid with bidder details
        const updatedProduct = await Product.findById(id).populate('bids.bidder', 'name');
        const populatedBid = updatedProduct.bids[0]; // Get the newly added bid

        // Get Socket.IO instance and emit real-time update
        const io = req.app.get('io');
        if (io) {
            // Emit to all users in this auction room
            io.to(`auction_${id}`).emit('newBid', {
                bidAmount: populatedBid.bidAmount,
                bidder: {
                    _id: populatedBid.bidder._id,
                    name: populatedBid.bidder.name
                },
                bidTime: populatedBid.bidTime
            });

            // Optional: Emit updated auction stats
            io.to(`auction_${id}`).emit('auctionUpdate', {
                auctionId: id,
                currentPrice: product.currentPrice,
                totalBids: product.bids.length,
                minNextBid: product.currentPrice + 1,
                maxNextBid: product.currentPrice + 10
            });
        }

        res.status(200).json({ 
            message: "Bid placed successfully",
            bidAmount: bidAmount,
            currentPrice: product.currentPrice,
            totalBids: product.bids.length,
            minNextBid: product.currentPrice + 1,
            maxNextBid: product.currentPrice + 10
        });

    } catch (error) {
        console.error('Error placing bid:', error);
        res.status(500).json({ message: "Error placing bid", error: error.message });
    }
}

export const dashboardData = async (req, res) => {
    try {
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