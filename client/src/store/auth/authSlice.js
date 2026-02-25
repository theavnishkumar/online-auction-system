import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api.js";

// Return user if loggedin
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  },
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await api.post(`/auth/login`, { email, password });

      const response = await api.get(`/user`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  },
);

// signup
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await api.post(`/auth/signup`, { name, email, password });

      const response = await api.get(`/user`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Signup failed");
    }
  },
);

// logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post(`/auth/logout`, {});
      return null;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  },
);

// initial auth state
const initialState = {
  user: null,
  loading: true,
  error: null,
};

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.user = null;
        state.error = payload;
        state.loading = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.user = null;
        state.error = payload;
        state.loading = false;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.user = null;
        state.error = payload;
        state.loading = false;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
