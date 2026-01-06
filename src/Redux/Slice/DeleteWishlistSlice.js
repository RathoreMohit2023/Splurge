import { createSlice } from '@reduxjs/toolkit';
import { DeleteWishlistApi } from '../Api/DeleteWishlistApi';

const DeleteWishlistSlice = createSlice({
  name: 'DeleteWishlist',
  initialState: {
    DeleteWishlistLoading: false,
    isError: false,
    DeleteWishlistData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteWishlistApi.pending, (state, action) => {
      state.AddTransactionLoading = true;
    });
    builder.addCase(DeleteWishlistApi.fulfilled, (state, action) => {
      state.AddTransactionLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(DeleteWishlistApi.rejected, (state, action) => {
      state.AddTransactionLoading = false;
      state.isError = true;
    });
  },
});
export default DeleteWishlistSlice.reducer;
