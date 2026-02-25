import getImageUrl from "../services/cloudinaryService.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import { getIO } from "../socket/index.js";

export const createAuction = async (req, res) => {
  try {
    const {
      itemName,
      startingPrice,
      itemDescription,
      itemCategory,
      itemStartDate,
      itemEndDate,
    } = req.body;
    let imageUrl = "";

    if (req.file) {
      try {
        imageUrl = getImageUrl(req.file);
      } catch (error) {
        return res.status(500).json({
          message: "Error uploading image to Cloudinary",
          error: error.message,
        });
      }
    }

    const start = itemStartDate ? new Date(itemStartDate) : new Date();
    const end = new Date(itemEndDate);
    if (end <= start) {
      return res
        .status(400)
        .json({ message: "Auction end date must be after start date" });
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

    res
      .status(201)
      .json({ message: "Auction created successfully", newAuction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating auction", error: error.message });
  }
};

export const showAuction = async (req, res) => {
  try {
    const auction = await Product.find({ itemEndDate: { $gt: new Date() } })
      .populate("seller", "name")
      .select(
        "itemName itemDescription currentPrice bids itemEndDate itemCategory itemPhoto seller",
      )
      .sort({ createdAt: -1 });
    const formatted = auction.map((item) => ({
      _id: item._id,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      currentPrice: item.currentPrice,
      bidsCount: item.bids.length,
      timeLeft: Math.max(0, new Date(item.itemEndDate) - new Date()),
      itemCategory: item.itemCategory,
      sellerName: item.seller.name,
      itemPhoto: item.itemPhoto,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching auctions", error: error.message });
  }
};

export const auctionById = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Product.findById(id)
      .populate("seller", "name")
      .populate("bids.bidder", "name");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    auction.bids.sort((a, b) => new Date(b.bidTime) - new Date(a.bidTime));
    res.status(200).json(auction);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching auctions", error: error.message });
  }
};

export const placeBid = async (req, res) => {
  try {
    const bidAmount = Number(req.body.bidAmount);
    const user = req.user.id;
    const { id } = req.params;

    if (isNaN(bidAmount)) {
      return res.status(400).json({ message: "Invalid bid amount" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Auction not found" });

    // Prevent seller from bidding on their own auction
    if (product.seller.toString() === user) {
      return res
        .status(403)
        .json({ message: "You cannot bid on your own auction" });
    }

    if (new Date(product.itemEndDate) < new Date())
      return res.status(400).json({ message: "Auction has already ended" });

    const minBid = Math.max(product.currentPrice, product.startingPrice) + 1;
    const maxBid = Math.max(product.currentPrice, product.startingPrice) + 10;
    if (bidAmount < minBid)
      return res
        .status(400)
        .json({ message: `Bid must be at least Rs ${minBid}` });
    if (bidAmount > maxBid)
      return res
        .status(400)
        .json({ message: `Bid must be at max Rs ${maxBid}` });

    // Atomic update to prevent race conditions
    const updated = await Product.findOneAndUpdate(
      {
        _id: id,
        currentPrice: product.currentPrice,
        itemEndDate: { $gt: new Date() },
      },
      {
        $set: { currentPrice: bidAmount },
        $push: { bids: { bidder: user, bidAmount } },
      },
      { new: true },
    );

    if (!updated) {
      return res
        .status(409)
        .json({ message: "Bid failed — price changed. Please try again." });
    }

    // Populate for the response and socket broadcast
    const populated = await Product.findById(id)
      .populate("seller", "name")
      .populate("bids.bidder", "name");

    populated.bids.sort((a, b) => new Date(b.bidTime) - new Date(a.bidTime));

    // Broadcast to all socket users in this auction room
    try {
      const io = getIO();
      const bidderName =
        populated.bids.find((b) => b.bidder?._id?.toString() === user)?.bidder
          ?.name || "Someone";

      io.to(id).emit("auction:bidPlaced", {
        auction: populated,
        bidderName,
        bidAmount,
        message: `${bidderName} placed a bid of Rs ${bidAmount}`,
      });
    } catch (socketErr) {
      // Socket broadcast is best-effort; don't fail the bid
      console.error("Socket broadcast error:", socketErr.message);
    }

    res
      .status(200)
      .json({ message: "Bid placed successfully", auction: populated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing bid", error: error.message });
  }
};

export const dashboardData = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const dateNow = new Date();
    const stats = await Product.aggregate([
      {
        $facet: {
          totalAuctions: [{ $count: "count" }],
          userAuctionCount: [
            { $match: { seller: userObjectId } },
            { $count: "count" },
          ],
          activeAuctions: [
            {
              $match: {
                itemStartDate: { $lte: dateNow },
                itemEndDate: { $gte: dateNow },
              },
            },
            { $count: "count" },
          ],
        },
      },
    ]);

    const totalAuctions = stats[0].totalAuctions[0]?.count || 0;
    const userAuctionCount = stats[0].userAuctionCount[0]?.count || 0;
    const activeAuctions = stats[0].activeAuctions[0]?.count || 0;

    const globalAuction = await Product.find({ itemEndDate: { $gt: dateNow } })
      .populate("seller", "name")
      .sort({ createdAt: -1 })
      .limit(3);
    const latestAuctions = globalAuction.map((item) => ({
      _id: item._id,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      currentPrice: item.currentPrice,
      bidsCount: item.bids.length,
      timeLeft: Math.max(0, new Date(item.itemEndDate) - new Date()),
      itemCategory: item.itemCategory,
      sellerName: item.seller.name,
      itemPhoto: item.itemPhoto,
    }));

    const userAuction = await Product.find({ seller: userObjectId })
      .populate("seller", "name")
      .sort({ createdAt: -1 })
      .limit(3);
    const latestUserAuctions = userAuction.map((item) => ({
      _id: item._id,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      currentPrice: item.currentPrice,
      bidsCount: item.bids.length,
      timeLeft: Math.max(0, new Date(item.itemEndDate) - new Date()),
      itemCategory: item.itemCategory,
      sellerName: item.seller.name,
      itemPhoto: item.itemPhoto,
    }));

    return res.status(200).json({
      totalAuctions,
      userAuctionCount,
      activeAuctions,
      latestAuctions,
      latestUserAuctions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting dashboard data", error: error.message });
  }
};

export const myAuction = async (req, res) => {
  try {
    const auction = await Product.find({ seller: req.user.id })
      .populate("seller", "name")
      .select(
        "itemName itemDescription currentPrice bids itemEndDate itemCategory itemPhoto seller",
      )
      .sort({ createdAt: -1 });
    const formatted = auction.map((item) => ({
      _id: item._id,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      currentPrice: item.currentPrice,
      bidsCount: item.bids.length,
      timeLeft: Math.max(0, new Date(item.itemEndDate) - new Date()),
      itemCategory: item.itemCategory,
      sellerName: item.seller.name,
      itemPhoto: item.itemPhoto,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching auctions", error: error.message });
  }
};
