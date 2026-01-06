import { createSlice } from '@reduxjs/toolkit';
import { DeleteTransactionApi } from '../Api/DeleteTransectionApi';

const DeleteTransectionSlice = createSlice({
  name: 'DeleteTransection',
  initialState: {
    DeleteTransectionLoading: false,
    isError: false,
    DeleteTransectionData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteTransactionApi.pending, (state, action) => {
      state.DeleteTransectionLoading = true;
    });
    builder.addCase(DeleteTransactionApi.fulfilled, (state, action) => {
      state.DeleteTransectionLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(DeleteTransactionApi.rejected, (state, action) => {
      state.DeleteTransectionLoading = false;
      state.isError = true;
    });
  },
});
export default DeleteTransectionSlice.reducer;
