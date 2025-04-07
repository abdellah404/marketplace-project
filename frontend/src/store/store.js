import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import annoncesReducer from "./annoncesSlice.js";
import categoriesReducer from "./categoriesSlice.js";
import favoritesReducer from "./favoritesSlice.js";
import themesReducer from "./themesSlice.js"; // Import themeReducer
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

// Persist configuration
const persistConfig = {
  key: "auth",
  storage,
};

const persistAnnoncesConfig = {
  key: "annonces",
  storage,
  whitelist: [
    "annoncesData",
    "AnnoncesCategory",
    "AnnonceDetails",
    "myAnnonces",
  ], // Ensure it is being saved
};

const persisteCategoriesConfig = {
  key: "categories",
  storage,
  whitelist: ["categoriesData"],
};

const persisteFavoritesConfig = {
  key: "favorites",
  storage,
  whitelist: ["favorites", "isFavorated"],
};

// Theme persist configuration
const persistThemeConfig = {
  key: "theme",
  storage,
  whitelist: ["isDarkMode"], // Persist only the isDarkMode state
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persisteAnnoncesReducer = persistReducer(
  persistAnnoncesConfig,
  annoncesReducer
);
const persisteCategoriesReducer = persistReducer(
  persisteCategoriesConfig,
  categoriesReducer
);
const persisteFavoritesReducer = persistReducer(
  persisteFavoritesConfig,
  favoritesReducer
);
const persisteThemeReducer = persistReducer(persistThemeConfig, themesReducer); // Persist themeReducer

// Configure store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    annonces: persisteAnnoncesReducer,
    categories: persisteCategoriesReducer,
    favorites: persisteFavoritesReducer,
    theme: persisteThemeReducer, // Add theme reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);
