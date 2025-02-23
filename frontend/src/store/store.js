import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

// Persist configuration
const persistConfig = {
    key: "auth",
    storage,  // You can replace with sessionStorage if needed
};

// Create a persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure store
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer
    }
});

// Create a persistor
export const persistor = persistStore(store);
