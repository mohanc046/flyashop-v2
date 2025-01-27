import { createSlice } from "@reduxjs/toolkit";

// Initial state for the token
const initialState = {
  token: null // Default token value
};

// Create a slice for token
const tokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    // Action to set the token
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Optional: Action to clear the token
    clearToken: (state) => {
      state.token = null;
    }
  }
});

// Export actions
export const { setToken, clearToken } = tokenSlice.actions;

// Export the reducer
export default tokenSlice.reducer;
