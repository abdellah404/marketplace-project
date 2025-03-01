import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import annoncesReducer from "./annoncesSlice.js";

// Persist configuration
const persistConfig = {
    key: "auth",
    storage,  // You can replace with sessionStorage if needed
    blacklist: ["token"], // Exclude sensitive data

};

const persistAnnoncesConfig = {
    key: "annonces",
    storage,
    whitelist: ["annoncesData"],  // Ensure it is being saved

};


// Create a persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persisteAnnoncesReducer = persistReducer(persistAnnoncesConfig, annoncesReducer);

// Configure store
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer ,
        annonces : persisteAnnoncesReducer,
    }
});



// Create a persistor
export const persistor = persistStore(store);
