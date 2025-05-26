import uploadImage from '../services/cloudinaryService.js';
import Product from '../models/product.js';


const createAuction = async (req, res) => {
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

const showAuction = async (req, res) => {
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

const auctionById = async (req, res) => {
    try {
        const { id } = req.params;
        const auction = await Product.findById(id)
            .populate("seller", "name")
            .populate("bids.bidder", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(auction);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching auctions', error: error.message });
    }
}

const placeBid = async (req, res) => {
    try {
        const { bidAmount } = req.body;
        const user = req.user.id;
        const { id } = req.params;

        const product = await Product.findById(id).populate('bids.bidder', "name");
        if (!product) return res.status(404).json({ message: "Auction not found" });

        if (new Date(product.itemEndDate) < new Date()) return res.status(400).json({ message: "Auction has already ended" });

        const minBid = Math.max(product.currentPrice, product.startingPrice) + 1;
        if (bidAmount < minBid) return res.status(400).json({ message: `Bid must be at least Rs ${minBid}` })

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

export { createAuction, showAuction, auctionById, placeBid };