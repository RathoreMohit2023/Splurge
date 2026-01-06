import { createSlice } from '@reduxjs/toolkit';
import { AddMonthlyBudgetApi } from '../Api/AddMonthlyBudgetApi';

const AddMonthlyBudgetSlice = createSlice({
  name: 'AddMonthlyBudget',
  initialState: {
    AddMonthlyBudgetLoading: false,
    isError: false,
    AddMonthlyBudgetData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddMonthlyBudgetApi.pending, (state, action) => {
      state.AddTransactionLoading = true;
    });
    builder.addCase(AddMonthlyBudgetApi.fulfilled, (state, action) => {
      state.AddTransactionLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(AddMonthlyBudgetApi.rejected, (state, action) => {
      state.AddTransactionLoading = false;
      state.isError = true;
    });
  },
});
export default AddMonthlyBudgetSlice.reducer;
