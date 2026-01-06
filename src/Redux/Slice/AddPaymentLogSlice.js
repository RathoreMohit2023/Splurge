import { createSlice } from '@reduxjs/toolkit';
import { AddPaymentLogApi } from '../Api/AddPaymentLogApi';

const AddPaymentLogSlice = createSlice({
  name: 'AddPaymentLog',
  initialState: {
    AddPaymentLogLoading: false,
    isError: false,
    AddPaymentLogData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddPaymentLogApi.pending, (state, action) => {
      state.AddPaymentLogLoading = true;
    });
    builder.addCase(AddPaymentLogApi.fulfilled, (state, action) => {
      state.AddPaymentLogLoading = false;
      state.AddPaymentLogData = action.payload;
    });
    builder.addCase(AddPaymentLogApi.rejected, (state, action) => {
      state.AddPaymentLogLoading = false;
      state.isError = true;
    });
  },
});


export default AddPaymentLogSlice.reducer;
