import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config().parsed;

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

export default auth;