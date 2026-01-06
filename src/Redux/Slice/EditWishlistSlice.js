import { createSlice } from '@reduxjs/toolkit';
import { EditWishlistApi } from '../Api/EditWishlistApi';

const EditWishlistSlice = createSlice({
  name: 'EditWishlist',
  initialState: {
    EditWishlistLoading: false,
    isError: false,
    EditWishlistData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(EditWishlistApi.pending, (state, action) => {
      state.AddTransactionLoading = true;
    });
    builder.addCase(EditWishlistApi.fulfilled, (state, action) => {
      state.AddTransactionLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(EditWishlistApi.rejected, (state, action) => {
      state.AddTransactionLoading = false;
      state.isError = true;
    });
  },
});
export default EditWishlistSlice.reducer;
