import { createSlice } from '@reduxjs/toolkit';
import { GetGroupMembersApi } from '../Api/GetGroupMemberApi';

const GetGroupMembersSlice = createSlice({
  name: 'GetGroupMembers',
  initialState: {
    GetGroupMembersLoading: false,
    isError: false,
    GetGroupMembersData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetGroupMembersApi.pending, (state, action) => {
      state.GetGroupMembersLoading = true;
    });
    builder.addCase(GetGroupMembersApi.fulfilled, (state, action) => {
      state.GetGroupMembersLoading = false;
      state.GetGroupMembersData = action.payload;
    });
    builder.addCase(GetGroupMembersApi.rejected, (state, action) => {
      state.GetGroupMembersLoading = false;
      state.isError = true;
    });
  },
});


export default GetGroupMembersSlice.reducer;
