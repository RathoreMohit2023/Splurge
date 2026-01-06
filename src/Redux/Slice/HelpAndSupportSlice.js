import { createSlice } from '@reduxjs/toolkit';
import { HelpAndSupportApi } from '../Api/HelpAndSupportApi';

const HelpAndSupportSlice = createSlice({
  name: 'HelpAndSupport',
  initialState: {
    HelpAndSupportLoading: false,
    isError: false,
    HelpAndSupportData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(HelpAndSupportApi.pending, (state, action) => {
      state.HelpAndSupportLoading = true;
    });
    builder.addCase(HelpAndSupportApi.fulfilled, (state, action) => {
      state.HelpAndSupportLoading = false;
      state.HelpAndSupportData = action.payload;
    });
    builder.addCase(HelpAndSupportApi.rejected, (state, action) => {
      state.HelpAndSupportLoading = false;
      state.isError = true;
    });
  },
});


export default HelpAndSupportSlice.reducer;
