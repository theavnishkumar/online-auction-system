import User from "../models/user.js";
import bcrypt from "bcrypt";

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
        res.status(201).json({ message: "User created successfully" });
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
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export { handleSignup, handleLogin };