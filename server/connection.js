import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config().parsed;

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB')
    }
}

export default connectDB;