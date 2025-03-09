// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService.js";

// Async thunks
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const data = await AuthService.register(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await AuthService.login(credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Login failed"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (updatedDetails, thunkAPI) => {
    try {
      const data = await AuthService.updateUser(updatedDetails);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Update failed"
      );
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    return true;
  }
);

const initialState = {
  token: null,
  user:  null,
  error: null,
  isAuthenticated : false
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Registration
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.isAuthenticated = true;

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.isAuthenticated = true;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;

      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
