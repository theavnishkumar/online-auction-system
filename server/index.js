import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config().parsed;
import connectDB from './connection.js'

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

connectDB();

app.get('/', async (req, res) => {
    res.json({ msg: 'Welcome to Online Auction System API' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});