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
        const currentDate = Date.now();
        const auctions = await Product.find({ itemEndDate: { $gte: currentDate } }).sort({ createdAt: -1 }).populate('seller', '_id name');
        return res.status(200).json({ message: 'All auctions', auctions });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching auctions', error: error.message });
    }
}

const auctionById = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const auction = await Product.findById(req.params.id).populate('seller', '_id name createdAt').populate({
            path: 'bids.bidder',
            select: 'name'
        });
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        auction.bids = auction.bids.sort((a, b) => b.bid - a.bid);

        // Pagination

        const startIndex = (page - 1) * limit;
        const paginatedBids = auction.bids.slice(startIndex, startIndex + limit);

        return res.status(200).json({
            message: 'Auction found',
            auction: {
                ...auction.toObject(),
                bids: paginatedBids,
                totalBids: auction.bids.length,
                totalPages: Math.ceil(auction.bids.length / limit),
                currentPage: parseInt(page)
            }
        });
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
        if (auction.itemEndDate < Date.now()) {
            return res.status(400).json({ message: 'Auction has ended' });
        }
        if (auction.itemPrice >= bid) {
            return res.status(400).json({ message: 'Bid must be greater than current price' });
        }
        auction.itemPrice = bid;
        auction.bids.push({ bidder, bid, time: Date.now() });
        await auction.save();
        return res.status(200).json({ message: 'Auction updated successfully', auction });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating auction', error: error.message });
    }
};

export { createAuction, showAuction, auctionById, updateAuctionById };