import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const VITE_API = import.meta.env.VITE_API;

const decodeToken = (token) => {
    try {
        return token ? jwtDecode(token) : null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

const initialState = {
    user: decodeToken(localStorage.getItem('token')),
    loading: false,
    error: null,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${VITE_API}/api/login`, { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.error : 'Login failed. Please try again.');
    }
});

export const signup = createAsyncThunk('auth/signup', async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${VITE_API}/api/signup`, { name, email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.error : 'Signup failed. Please try again.');
    }
});

export const deleteAccount = createAsyncThunk('auth/deleteAccount', async (userId, { rejectWithValue }) => {
    try {
        await axios.delete(`${VITE_API}/api/delete`, { data: { userId } });
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        return null;
    } catch (error) {
        return rejectWithValue('Failed to delete account.');
    }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        return rejectWithValue('Failed to authenticate.');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            state.user = null;
            state.userToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.loading = false;
            })
            .addCase(checkAuth.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
            })
            .addCase(signup.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
            })
            .addCase(deleteAccount.rejected, (state, { payload }) => {
                state.error = payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
