import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import auctionReducer from './auction/auctionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        auctions: auctionReducer,
    },
});
