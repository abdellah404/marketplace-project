import { configureStore } from "@reduxjs/toolkit";

import themesReducer from "./themesSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";




const persistThemeConfig = {
  key: "theme",
  storage,
  whitelist: ["isDarkMode"], // Persist only the isDarkMode state
};

// Wrap auth and theme reducers with persistReducer
const persistedThemeReducer = persistReducer(persistThemeConfig, themesReducer);

// Configure store with persisted auth and theme; other reducers remain plain
export const store = configureStore({
  
  reducer: {
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