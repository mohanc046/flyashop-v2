import { createSlice } from "@reduxjs/toolkit";

// Initial state for the header title
const initialState = {
  title: "Home", // Default header title
};

// Create a slice for header title
const headerTitleSlice = createSlice({
  name: "headerTitle",
  initialState,
  reducers: {
    // Action to set a new title
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    // Optional: Action to reset title to the default
    resetTitle: (state) => {
      state.title = initialState.title;
    },
  },
});

// Export actions
export const { setTitle, resetTitle } = headerTitleSlice.actions;

// Export the reducer
export default headerTitleSlice.reducer;
