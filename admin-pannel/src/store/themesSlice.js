import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isDarkMode: false,
};

const themesSlice = createSlice({
    name: "theme",
    initialState,
    
        reducers: {
                toggleTheme(state, action) {
                        state.isDarkMode = action.payload;
                },
        },
    
});

export const {toggleTheme} = themesSlice.actions;
export default themesSlice.reducer;
