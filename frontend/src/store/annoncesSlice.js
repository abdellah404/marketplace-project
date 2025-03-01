// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AnnoncesService from "../services/AnnoncesService.js";

// Async thunks
export const getAllAnnonces = createAsyncThunk(
  "annonces/getAllAnnonces",
  async (_, thunkAPI) => {
    try {
      const data = await AnnoncesService.annonces();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "loading annonces failed"
      );
    }
  }
);

const initialState = {
  annoncesData: [],
  loading: false,
  error: null,
};

const annoncesSlice = createSlice({
  name: "annonces",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // annonces
    builder
      .addCase(getAllAnnonces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAnnonces.fulfilled, (state, action) => {
        state.annoncesData = action.payload.data;
      })
      .addCase(getAllAnnonces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = annoncesSlice.actions;
export default annoncesSlice.reducer;
