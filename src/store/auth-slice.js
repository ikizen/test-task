import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        login: (state, value) => {
            state.token = value;
        },
        logout: (state) => {
            state.token = null;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice;
