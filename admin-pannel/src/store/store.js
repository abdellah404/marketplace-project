import { configureStore } from "@reduxjs/toolkit";

import themesReducer from "./themesSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import authReducer from "./authSlice.js"; // Import your auth reducer

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

const persistAuthConfig = {
  key: "auth",
  storage,
};

// Wrap auth and theme reducers with persistReducer
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedThemeReducer = persistReducer(persistThemeConfig, themesReducer);



// Configure store with persisted auth and theme; other reducers remain plain
export const store = configureStore({
  
  reducer: {
    auth: persistedAuthReducer,
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