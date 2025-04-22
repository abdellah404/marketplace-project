import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import annoncesReducer from "./annoncesSlice.js";
import categoriesReducer from "./categoriesSlice.js";
import favoritesReducer from "./favoritesSlice.js";
import themesReducer from "./themesSlice.js";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

// Persist configuration only for auth and theme
const persistAuthConfig = {
  key: "auth",
  storage,
};

const persistThemeConfig = {
  key: "theme",
  storage,
  whitelist: ["isDarkMode"], // Persist only the isDarkMode state
};

// Create persisted reducers for auth and theme
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedThemeReducer = persistReducer(persistThemeConfig, themesReducer);

// Configure store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    annonces: annoncesReducer,
    categories: categoriesReducer,
    favorites: favoritesReducer,
    theme: persistedThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);