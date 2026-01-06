import { createSlice } from '@reduxjs/toolkit';
import { GetInterestApi } from '../Api/GetInterestApi';

const GetInterestSlice = createSlice({
  name: 'GetInterest',
  initialState: {
    GetInterestLoading: false,
    isError: false,
    GetInterestData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetInterestApi.pending, (state, action) => {
      state.GetInterestLoading = true;
    });
    builder.addCase(GetInterestApi.fulfilled, (state, action) => {
      state.GetInterestLoading = false;
      state.GetInterestData = action.payload;
    });
    builder.addCase(GetInterestApi.rejected, (state, action) => {
      state.GetInterestLoading = false;
      state.isError = true;
    });
  },
});


export default GetInterestSlice.reducer;
