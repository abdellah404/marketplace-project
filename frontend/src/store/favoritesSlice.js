// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoriesService from "../services/CategoriesService.js";
import favoritesService from "../services/favoritesService.js";

// Async thunks
export const get_Favorites = createAsyncThunk(
  "categories/getFavorites",
  async (_, thunkAPI) => {
    try {
      const data = await favoritesService.getFavorites();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "getting favorites failed"
      );
    }
  }
);



export const add_Favorite = createAsyncThunk(
    "favorites/addFavorite",
    async (annonce_id , thunkAPI) => {
      try {
        const data = await favoritesService.addFavorite(annonce_id);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || error.message || "adding favorite failed"
        );
      }
    }
  );


  export const delete_Favorite = createAsyncThunk(
    "favorites/deleteFavorite",
    async (data, thunkAPI) => {
      try {
        const response = await favoritesService.removeFavorite(data);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
  export const is_Favorated = createAsyncThunk(
    "favorites/isFavorited",
    async (annonce_id, thunkAPI) => {
      try {
        const response = await favoritesService.isFavorated(annonce_id);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );



const initialState = {
  favorites: [],
  isFavorated: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
   
   
      .addCase(is_Favorated.fulfilled, (state, action) => {
        state.isFavorated = action.payload.data;
      })
      .addCase(add_Favorite.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(delete_Favorite.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(is_Favorated.rejected, (state, action) => {
        state.error = action.payload;
      });
  },

});

export const { clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
