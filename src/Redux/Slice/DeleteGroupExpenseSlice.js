import { createSlice } from '@reduxjs/toolkit';
import { DeleteGroupExpenseApi } from '../Api/DeleteGroupExpenseAPi';

const DeleteGroupExpenseSlice = createSlice({
  name: 'DeleteGroupExpense',
  initialState: {
    DeleteGroupExpenseLoading: false,
    isError: false,
    DeleteGroupExpenseData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteGroupExpenseApi.pending, (state, action) => {
      state.DeleteGroupExpenseLoading = true;
    });
    builder.addCase(DeleteGroupExpenseApi.fulfilled, (state, action) => {
      state.DeleteGroupExpenseLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(DeleteGroupExpenseApi.rejected, (state, action) => {
      state.DeleteGroupExpenseLoading = false;
      state.isError = true;
    });
  },
});
export default DeleteGroupExpenseSlice.reducer;
