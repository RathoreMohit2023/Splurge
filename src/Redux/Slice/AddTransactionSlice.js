import { createSlice } from '@reduxjs/toolkit';
import { AddTransactionApi } from '../Api/AddTransactionApi';

const AddTransactionSlice = createSlice({
  name: 'AddTransaction',
  initialState: {
    AddTransactionLoading: false,
    isError: false,
    AddTransactionData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddTransactionApi.pending, (state, action) => {
      state.AddTransactionLoading = true;
    });
    builder.addCase(AddTransactionApi.fulfilled, (state, action) => {
      state.AddTransactionLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(AddTransactionApi.rejected, (state, action) => {
      state.AddTransactionLoading = false;
      state.isError = true;
    });
  },
});


export default AddTransactionSlice.reducer;
