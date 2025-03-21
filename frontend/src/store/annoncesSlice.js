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

export const addNewAnnonce = createAsyncThunk("annonces/addNewAnnonce",async (annonceFormData, thunkAPI) => {
    try {
      const data = await AnnoncesService.addAnnonce(annonceFormData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "storing annonce failed"
      );
    }
  }
);

export const getAnnoncesById = createAsyncThunk("annonces/getAnnoncesById",async (cat_id, thunkAPI) => {
  try {
    const data = await AnnoncesService.getAnnonces(cat_id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || error.message || "fetching annonces failed"
    );
  }
}
);

export const getAnnonceDetailsById = createAsyncThunk("annonces/getAnnonceDetailsById",async (ann_id, thunkAPI) => {
  try {
    const data = await AnnoncesService.getAnnonceDetails(ann_id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || error.message || "fetching annonces failed"
    );
  }
}
);

const initialState = {
  annoncesData: [],
  AnnoncesCategory: [],
  AnnonceDetails : [],
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
    // fetch annonces
    builder
      .addCase(getAllAnnonces.pending, (state) => {
        state.error = null;
      })
      .addCase(getAllAnnonces.fulfilled, (state, action) => {
        state.annoncesData = action.payload.data;
      })
      .addCase(getAllAnnonces.rejected, (state, action) => {
        state.error = action.payload;
      })
      // add annonce
      .addCase(addNewAnnonce.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewAnnonce.rejected, (state, action) => {
        state.error = action.payload;
      })
      // fetch annonces by category
      .addCase(getAnnoncesById.fulfilled, (state, action) => {
        state.AnnoncesCategory = action.payload.data ;
      })
      // fetch annonce details
      .addCase(getAnnonceDetailsById.fulfilled, (state, action) => {
        state.AnnonceDetails = action.payload.data ;
      }
      );
  },
});

export const { clearError } = annoncesSlice.actions;
export default annoncesSlice.reducer;
