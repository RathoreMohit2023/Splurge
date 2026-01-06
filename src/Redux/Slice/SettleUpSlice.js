import { createSlice } from '@reduxjs/toolkit';
import { SettleUpApi } from '../Api/SettleUpApi';

const SettleUpSlice = createSlice({
  name: 'SettleUp',
  initialState: {
    SettleUpLoading: false,
    isError: false,
    SettleUpData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(SettleUpApi.pending, (state, action) => {
      state.SettleUpLoading = true;
    });
    builder.addCase(SettleUpApi.fulfilled, (state, action) => {
      state.SettleUpLoading = false;
      state.SettleUpData = action.payload;
    });
    builder.addCase(SettleUpApi.rejected, (state, action) => {
      state.SettleUpLoading = false;
      state.isError = true;
    });
  },
});


export default SettleUpSlice.reducer;
