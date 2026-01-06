import { createSlice } from '@reduxjs/toolkit';
import { EditTransectionApi } from '../Api/EditTransectionApi';

const EditTransactionSlice = createSlice({
  name: 'EditTransaction',
  initialState: {
    EditTransactionLoading: false,
    isError: false,
    EditTransactionData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(EditTransectionApi.pending, (state, action) => {
      state.AddTransactionLoading = true;
    });
    builder.addCase(EditTransectionApi.fulfilled, (state, action) => {
      state.AddTransactionLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(EditTransectionApi.rejected, (state, action) => {
      state.AddTransactionLoading = false;
      state.isError = true;
    });
  },
});
export default EditTransactionSlice.reducer;
