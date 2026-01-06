import { createSlice } from '@reduxjs/toolkit';
import { EditMonthlyBudgetApi } from '../Api/EditMonthlyBudgetApi';

const EditMonthlyBudgetSlice = createSlice({
  name: 'EditMonthlyBudget',
  initialState: {
    EditMonthlyBudgetLoading: false,
    isError: false,
    EditMonthlyBudgetData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(EditMonthlyBudgetApi.pending, (state, action) => {
      state.EditTransactionLoading = true;
    });
    builder.addCase(EditMonthlyBudgetApi.fulfilled, (state, action) => {
      state.EditTransactionLoading = false;
      state.EditTransactionData = action.payload;
    });
    builder.addCase(EditMonthlyBudgetApi.rejected, (state, action) => {
      state.EditTransactionLoading = false;
      state.isError = true;
    });
  },
});
export default EditMonthlyBudgetSlice.reducer;
