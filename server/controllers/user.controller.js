import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Product from "../models/product.js";
import mongoose from "mongoose";

dotenv.config().parsed;

const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ error: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id, name: name, email: email }, process.env.JWT_SECRET, { expiresIn: '14d' });
        return res.status(200).json({ token });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User doesn't exist." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '14d' });
        return res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const handleDelete = async (req, res) => {
    const { userId } = req.body;

    try {
        // Find the user first
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({ error: "User doesn't exist." });
        }

        // Delete all posts of the user
        await Product.deleteMany({ seller: userId });

        // Delete the user
        await User.findOneAndDelete({ _id: userId });

        return res.status(200).json({ message: "User and all related posts deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const handleGetUser = async (req, res) => {
    const { seller } = req.body;
    console.log(seller);
    const user = await User.findOne({ _id: seller }, { name: 1, _id: 0 });
    return res.status(200).json(user);

}


export { handleSignup, handleLogin, handleDelete, handleGetUser };