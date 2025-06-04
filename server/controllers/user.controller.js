import User from "../models/user.js";
import bcrypt from "bcrypt";

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

export const handleChangePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: "Please enter all fields" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "New password and confirm password do not match." });
        }
        if (currentPassword === newPassword) {
            return res.status(400).json({ error: "You can't reuse the old password." });
        }

        const userID = req.user.id;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Current password is incorrect." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({ message: "Password changed successfully." });
    } catch (err) {
        console.error("Error changing password:", err);
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
};