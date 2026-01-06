import { createSlice } from '@reduxjs/toolkit';
import { AddWishlistApi } from '../Api/AddWishlistApi';

const AddWishlistSlice = createSlice({
  name: 'AddWishlist',
  initialState: {
    AddWishlistLoading: false,
    isError: false,
    AddWishlistData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddWishlistApi.pending, (state, action) => {
      state.AddTransactionLoading = true;
    });
    builder.addCase(AddWishlistApi.fulfilled, (state, action) => {
      state.AddTransactionLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(AddWishlistApi.rejected, (state, action) => {
      state.AddTransactionLoading = false;
      state.isError = true;
    });
  },
});
export default AddWishlistSlice.reducer;
