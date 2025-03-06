// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoriesService from "../services/CategoriesService.js";

// Async thunks
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const data = await CategoriesService.categories();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "loading categories failed"
      );
    }
  }
);

const initialState = {
  categoriesData: [],
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // annonces
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categoriesData = action.payload.data;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
