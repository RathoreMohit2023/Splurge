import { createSlice } from '@reduxjs/toolkit';
import { GetFriendsApi } from '../Api/GetFriendsApi';

const GetFriendsSlice = createSlice({
  name: 'GetFriends',
  initialState: {
    GetFriendsLoading: false,
    isError: false,
    GetFriendsData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetFriendsApi.pending, (state, action) => {
      state.GetFriendsLoading = true;
    });
    builder.addCase(GetFriendsApi.fulfilled, (state, action) => {
      state.GetFriendsLoading = false;
      state.GetFriendsData = action.payload;
    });
    builder.addCase(GetFriendsApi.rejected, (state, action) => {
      state.GetFriendsLoading = false;
      state.isError = true;
    });
  },
});


export default GetFriendsSlice.reducer;
