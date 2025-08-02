import Product from '../models/product.js';
import User from '../models/user.js';
import { connectDB } from '../connection.js';

export const getAdminDashboard = async (req, res) => {
    try {
        await connectDB();
        
        const activeAuctions = await Product.find({ itemEndDate: { $gt: new Date() } })
            .populate('seller', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);
            
        const inactiveAuctions = await Product.find({ itemEndDate: { $lt: new Date() } })
            .populate('seller', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);
            
        const recentUsers = await User.find({})
            .select('name email signupAt')
            .sort({ createdAt: -1 })
            .limit(10);
        res.status(200).json({
            activeAuctions,
            inactiveAuctions,
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin dashboard data', error: error.message });
    }
};
