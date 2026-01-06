import { createSlice } from '@reduxjs/toolkit';
import { GetMonthlyBudgetApi } from '../Api/GetMonthlyBudgetApi';

const GetMonthlyBudgetSlice = createSlice({
  name: 'GetMonthlyBudget',
  initialState: {
    GetMonthlyBudgetloading: false,
    isError: false,
    GetMonthlyBudgetData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetMonthlyBudgetApi.pending, (state, action) => {
      state.GetMonthlyBudgetloading = true;
    });
    builder.addCase(GetMonthlyBudgetApi.fulfilled, (state, action) => {
      state.GetMonthlyBudgetloading = false;
      state.GetMonthlyBudgetData = action.payload;
    });
    builder.addCase(GetMonthlyBudgetApi.rejected, (state, action) => {
      state.GetMonthlyBudgetloading = false;
      state.isError = true;
    });
  },
});


export default GetMonthlyBudgetSlice.reducer;
