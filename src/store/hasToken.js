import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "token",
    initialState: { hasToken: false },
    reducers: {
        hasToken: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            state.hasToken = true;
        },
    },
});

// Action creators are generated for each case reducer function
export const { hasToken } = tokenSlice.actions;

export default tokenSlice.reducer;
