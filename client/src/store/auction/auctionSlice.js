import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API = import.meta.env.VITE_API;


const initialState = {
    auctions: [],
    loading: false,
    error: null,
    userData: null,
    userProducts: [],
};


export const fetchAuctions = createAsyncThunk(
    'auctions/fetchAuctions',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await axios.get(`${VITE_API}/api/auction/show`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserAndProducts = createAsyncThunk(
    'auctions/fetchUserAndProducts',
    async (userId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await axios.get(`${VITE_API}/api/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An unexpected error occurred.");
        }
    }
);

const auctionSlice = createSlice({
    name: 'auctions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuctions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuctions.fulfilled, (state, action) => {
                state.loading = false;
                state.auctions = action.payload.auctions;
            })
            .addCase(fetchAuctions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // cases for fetchUserAndProducts
            .addCase(fetchUserAndProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserAndProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.user;
                state.userProducts = action.payload.products;
            })
            .addCase(fetchUserAndProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default auctionSlice.reducer;