import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    bidder: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    bidAmount: { type: Number, required: true },
    bidTime: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    itemCategory: {
        type: String,
        required: true,
    },
    itemPhoto: {
        type: String,
    },
    startingPrice: {
        type: Number,
        required: true,
    },
    currentPrice: {
        type: Number,
        default: 0,
    },
    itemStartDate: {
        type: Date,
        default: Date.now,
    },
    itemEndDate: {
        type: Date,
        required: true,
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    bids: [bidSchema],
    winner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null
    },
    isSold: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
