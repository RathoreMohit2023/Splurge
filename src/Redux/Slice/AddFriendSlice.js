import { createSlice } from '@reduxjs/toolkit';
import { AddFriendApi } from '../Api/AddFriendApi';

const AddFriendSlice = createSlice({
  name: 'AddFriend',
  initialState: {
    AddFriendLoading: false,
    isError: false,
    AddFriendData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddFriendApi.pending, (state, action) => {
      state.AddFriendLoading = true;
    });
    builder.addCase(AddFriendApi.fulfilled, (state, action) => {
      state.AddFriendLoading = false;
      state.AddFriendData = action.payload;
    });
    builder.addCase(AddFriendApi.rejected, (state, action) => {
      state.AddFriendLoading = false;
      state.isError = true;
    });
  },
});


export default AddFriendSlice.reducer;
