import { createSlice } from '@reduxjs/toolkit';
import { AddGroupExpenseApi } from '../Api/AddGroupExpenseApi';

const AddGroupExpenseSlice = createSlice({
  name: 'AddGroupExpense',
  initialState: {
    AddGroupExpenseLoading: false,
    isError: false,
    AddGroupExpenseData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddGroupExpenseApi.pending, (state, action) => {
      state.AddGroupExpenseLoading = true;
    });
    builder.addCase(AddGroupExpenseApi.fulfilled, (state, action) => {
      state.AddGroupExpenseLoading = false;
      state.AddGroupExpenseData = action.payload;
    });
    builder.addCase(AddGroupExpenseApi.rejected, (state, action) => {
      state.AddGroupExpenseLoading = false;
      state.isError = true;
    });
  },
});


export default AddGroupExpenseSlice.reducer;
