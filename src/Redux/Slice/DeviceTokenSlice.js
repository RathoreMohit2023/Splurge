import { createSlice } from '@reduxjs/toolkit';
import { DeviceTokenApi } from '../Api/DeviceTokenApi';

const DeviceTokenSlice = createSlice({
  name: 'DeviceToken',
  initialState: {
    DeviceTokenLoading: false,
    isError: false,
    DeviceTokenData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeviceTokenApi.pending, (state, action) => {
      state.DeviceTokenLoading = true;
    });
    builder.addCase(DeviceTokenApi.fulfilled, (state, action) => {
      state.DeviceTokenLoading = false;
      state.DeviceTokenData = action.payload;
    });
    builder.addCase(DeviceTokenApi.rejected, (state, action) => {
      state.DeviceTokenLoading = false;
      state.isError = true;
    });
  },
});


export default DeviceTokenSlice.reducer;
