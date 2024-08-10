import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        default: 0
    },
    itemCategory: {
        type: String,
        required: true,
    },
    itemPhoto: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    itemStartDate: {
        type: Date,
        default: Date.now
    },
    itemEndDate: {
        type: Date,
        required: "Auction end time is required"
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    bids: [{
        bidder: { type: mongoose.Schema.ObjectId, ref: 'User' },
        bid: Number,
        time: Date
    }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;