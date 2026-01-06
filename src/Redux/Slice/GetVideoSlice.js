import { createSlice } from '@reduxjs/toolkit';
import { GetvideoApi } from '../Api/GetVideoApi';

const GetVideoSlice = createSlice({
  name: 'GetVideo',
  initialState: {
    GetVideoLoading: false,
    isError: false,
    GetVideoData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetvideoApi.pending, (state, action) => {
      state.GetVideoLoading = true;
    });
    builder.addCase(GetvideoApi.fulfilled, (state, action) => {
      state.GetVideoLoading = false;
      state.GetVideoData = action.payload;
    });
    builder.addCase(GetvideoApi.rejected, (state, action) => {
      state.GetVideoLoading = false;
      state.isError = true;
    });
  },
});


export default GetVideoSlice.reducer;
