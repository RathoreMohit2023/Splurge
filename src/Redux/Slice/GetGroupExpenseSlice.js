import { createSlice } from '@reduxjs/toolkit';
import { GetGroupExpenseApi } from '../Api/GetGroupExpenseApi';

const GetGroupExpenseSlice = createSlice({
  name: 'GetGroupExpense',
  initialState: {
    GetGroupExpenseLoading: false,
    isError: false,
    GetGroupExpenseData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetGroupExpenseApi.pending, (state, action) => {
      state.GetGroupExpenseLoading = true;
    });
    builder.addCase(GetGroupExpenseApi.fulfilled, (state, action) => {
      state.GetGroupExpenseLoading = false;
      state.GetGroupExpenseData = action.payload;
    });
    builder.addCase(GetGroupExpenseApi.rejected, (state, action) => {
      state.GetGroupExpenseLoading = false;
      state.isError = true;
    });
  },
});


export default GetGroupExpenseSlice.reducer;
