import { createSlice } from '@reduxjs/toolkit';
import { GetPaymentLogApi } from '../Api/GetPaymentLogApi';

const GetPaymentLogSlice = createSlice({
  name: 'GetPaymentLog',
  initialState: {
    GetPaymentLogLoading: false,
    isError: false,
    GetPaymentLogData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetPaymentLogApi.pending, (state, action) => {
      state.GetPaymentLogLoading = true;
    });
    builder.addCase(GetPaymentLogApi.fulfilled, (state, action) => {
      state.GetPaymentLogLoading = false;
      state.GetPaymentLogData = action.payload;
    });
    builder.addCase(GetPaymentLogApi.rejected, (state, action) => {
      state.GetPaymentLogLoading = false;
      state.isError = true;
    });
  },
});


export default GetPaymentLogSlice.reducer;
