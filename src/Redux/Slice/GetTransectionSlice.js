import { createSlice } from '@reduxjs/toolkit';
import { GetTransectionApi } from '../Api/GetTransectionApi';

const GetTransactionSlice = createSlice({
  name: 'GetTransaction',
  initialState: {
    GetTransactionLoading: false,
    isError: false,
    GetTransactionData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetTransectionApi.pending, (state, action) => {
      state.GetTransactionLoading = true;
    });
    builder.addCase(GetTransectionApi.fulfilled, (state, action) => {
      state.GetTransactionLoading = false;
      state.GetTransactionData = action.payload;
    });
    builder.addCase(GetTransectionApi.rejected, (state, action) => {
      state.GetTransactionLoading = false;
      state.isError = true;
    });
  },
});


export default GetTransactionSlice.reducer;
