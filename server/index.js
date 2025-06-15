import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config();
import { connectDB } from './connection.js'
import auctionRouter from './routes/auction.js';
import { secureRoute } from './middleware/auth.js';
import userAuthRouter from './routes/userAuth.js';
import userRouter from './routes/user.js';
import contactRouter from "./routes/contact.js";
import { Server } from 'socket.io';
import { createServer } from 'http'; 
import User from './models/user.js';
import { verifyToken } from './utils/jwt.js';
const port = process.env.PORT || 4000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));

connectDB();

app.get('/', async (req, res) => {
    res.json({ msg: 'Welcome to Online Auction System API' });
});
app.use('/auth', userAuthRouter)
app.use('/user', secureRoute, userRouter)
app.use('/auction', secureRoute, auctionRouter);
app.use('/contact', contactRouter);

const server = createServer(app);


const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
});
  
// Helper function to parse cookies
const parseCookies = (cookieString) => {
  const cookies = {};
  if (cookieString) {
    cookieString.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = value;
    });
  }
  return cookies;
};

io.use(async (socket, next) => {
    try {      
      // Parse cookies and extract auth_token
      const cookies = parseCookies(socket.handshake.headers.cookie);
      const token = cookies.auth_token;
      
      if (!token) {
        return next(new Error('Authentication token not found'));
      }
        
      const decoded = verifyToken(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('User not found'));
      }
  
      socket.userId = user._id.toString();
      socket.userName = user.name;
      next();
    } catch (error) {
      console.error('Socket auth error:', error);
      next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    console.log(`User ${socket.userName} connected`);
  
    // Join auction room
    socket.on('joinAuction', (auctionId) => {
      socket.join(`auction_${auctionId}`);
      console.log(`User ${socket.userName} joined auction ${auctionId}`);
    });
  
    // Leave auction room
    socket.on('leaveAuction', (auctionId) => {
      socket.leave(`auction_${auctionId}`);
      console.log(`User ${socket.userName} left auction ${auctionId}`);
    });
  
    // Handle bid placement (this emits to other users in the room)
    socket.on('placeBid', (bidData) => {
      // Broadcast to all users in the auction room except the sender
      socket.to(`auction_${bidData.auctionId}`).emit('newBid', {
        bidAmount: bidData.bidAmount,
        bidder: {
          _id: bidData.bidder._id,
          name: bidData.bidder.name
        },
        bidTime: bidData.bidTime
      });
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${socket.userName} disconnected`);
    });
  });

app.set('io', io);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});