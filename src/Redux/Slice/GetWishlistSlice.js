import { createSlice } from '@reduxjs/toolkit';
import { GetWishlistApi } from '../Api/GetWishlistApi';

const GetWishlistSlice = createSlice({
  name: 'GetWishlist',
  initialState: {
    GetWishlistLoading: false,
    isError: false,
    GetWishlistData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetWishlistApi.pending, (state, action) => {
      state.GetWishlistLoading = true;
    });
    builder.addCase(GetWishlistApi.fulfilled, (state, action) => {
      state.GetWishlistLoading = false;
      state.GetWishlistData = action.payload;
    });
    builder.addCase(GetWishlistApi.rejected, (state, action) => {
      state.GetWishlistLoading = false;
      state.isError = true;
    });
  },
});


export default GetWishlistSlice.reducer;
