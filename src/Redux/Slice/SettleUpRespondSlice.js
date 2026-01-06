import { createSlice } from '@reduxjs/toolkit';
import { SettleUpRespondApi } from '../Api/SettleUpRespondApi';

const SettleUpRespondSlice = createSlice({
  name: 'SettleUpRespond',
  initialState: {
    SettleUpRespondLoading: false,
    isError: false,
    SettleUpRespondData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(SettleUpRespondApi.pending, (state, action) => {
      state.SettleUpRespondLoading = true;
    });
    builder.addCase(SettleUpRespondApi.fulfilled, (state, action) => {
      state.SettleUpRespondLoading = false;
      state.SettleUpRespondData = action.payload;
    });
    builder.addCase(SettleUpRespondApi.rejected, (state, action) => {
      state.SettleUpRespondLoading = false;
      state.isError = true;
    });
  },
});


export default SettleUpRespondSlice.reducer;
