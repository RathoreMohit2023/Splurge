import { createSlice } from '@reduxjs/toolkit';
import { ForgoteApi } from '../Api/ForgoteApi'

const forgoteSlice = createSlice({
    name: "Forgote",
    initialState: {
        forgoteLoading: false,
        forgoteData: [],
        isError: false,
        message: "",
    },

    extraReducers: (builder) => {
        builder.addCase(ForgoteApi.pending, (state) => {
            state.forgoteLoading = true;
            state.isError = false;
        });
        builder.addCase(ForgoteApi.fulfilled, (state, action) => {
            state.forgoteLoading = false;
            state.forgoteData = action.payload;
            state.message = action.payload?.message || "Email sent successfully";
        });
        builder.addCase(ForgoteApi.rejected, (state, action) => {
            state.forgoteLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to sent email"
        });
    }
});

export default forgoteSlice.reducer;