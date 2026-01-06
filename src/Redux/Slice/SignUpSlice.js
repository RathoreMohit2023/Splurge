import { createSlice } from '@reduxjs/toolkit';
import { SignUpApi } from "../Api/SignUpApi";

const SignUpSlice = createSlice({
    name: 'SignUp',
    initialState: {
        SignUploading: false,
        isError: false,
        SignUpData: []
    },

    extraReducers: (builder) => {
        builder.addCase(SignUpApi.pending, (state, action) => {
            state.SignUploading = true
        });
        builder.addCase(SignUpApi.fulfilled, (state, action) => {
            state.SignUploading = false;
            state.SignUpData = action.payload
        });
        builder.addCase(SignUpApi.rejected, (state, action) => {
            state.SignUploading = false;
            state.isError = true;
        })
    }
});

export default SignUpSlice.reducer;