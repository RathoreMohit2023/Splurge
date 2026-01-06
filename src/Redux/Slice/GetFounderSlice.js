import { createSlice } from '@reduxjs/toolkit';
import { GetFounderApi } from '../Api/GetFounderApi';

const GetFounderSlice = createSlice({
  name: 'GetFounder',
  initialState: {
    GetFounderloading: false,
    isError: false,
    GetFounderData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetFounderApi.pending, (state, action) => {
      state.GetFounderloading = true;
    });
    builder.addCase(GetFounderApi.fulfilled, (state, action) => {
      state.GetFounderloading = false;
      state.GetFounderData = action.payload;
    });
    builder.addCase(GetFounderApi.rejected, (state, action) => {
      state.GetFounderloading = false;
      state.isError = true;
    });
  },
});


export default GetFounderSlice.reducer;
