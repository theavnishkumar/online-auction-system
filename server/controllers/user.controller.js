import User from "../models/user.js";

export const handleGetUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("name email avatar");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}