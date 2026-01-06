import { createSlice } from '@reduxjs/toolkit';
import { RemainderApi } from '../Api/RemainderApi';

const RemainderSlice = createSlice({
  name: 'Remainder',
  initialState: {
    RemainderLoading: false,
    isError: false,
    RemainderData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(RemainderApi.pending, (state, action) => {
      state.RemainderLoading = true;
    });
    builder.addCase(RemainderApi.fulfilled, (state, action) => {
      state.RemainderLoading = false;
      state.RemainderData = action.payload;
    });
    builder.addCase(RemainderApi.rejected, (state, action) => {
      state.RemainderLoading = false;
      state.isError = true;
    });
  },
});


export default RemainderSlice.reducer;
