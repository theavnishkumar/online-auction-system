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

export const getAllUsers = async (req, res) => {
    try {
        await connectDB();
        
        // Get pagination parameters from query string
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        
        // Calculate skip value for pagination
        const skip = (page - 1) * limit;
        
        // Build search query
        const searchQuery = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        } : {};
        
        // Get total count for pagination info
        const totalUsers = await User.countDocuments(searchQuery);
        
        // Get users with pagination, search, and sorting
        const users = await User.find(searchQuery)
            .select('name email role createdAt signupAt avatar')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean();
        
        // Calculate pagination info
        const totalPages = Math.ceil(totalUsers / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        
        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalUsers,
                    limit,
                    hasNextPage,
                    hasPrevPage
                }
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching users', 
            error: error.message 
        });
    }
};
