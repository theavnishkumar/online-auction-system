import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startingBid: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bidStart: {
        type: Date,
        default: Date.now
    },
    bidEnd: {
        type: Date,
        required: "Auction end time is required"
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    bids: [{
        bidder: { type: mongoose.Schema.ObjectId, ref: 'user' },
        bid: Number,
        time: Date
    }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;