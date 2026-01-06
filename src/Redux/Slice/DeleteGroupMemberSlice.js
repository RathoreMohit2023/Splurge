import { createSlice } from '@reduxjs/toolkit';
import { DeleteGroupMemberApi } from '../Api/DeleteGroupMembersApi';

const DeleteGroupMemberSlice = createSlice({
  name: 'DeleteGroupMember',
  initialState: {
    DeleteGroupMemberLoading: false,
    isError: false,
    DeleteGroupMemberData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteGroupMemberApi.pending, (state, action) => {
      state.DeleteGroupMemberLoading = true;
    });
    builder.addCase(DeleteGroupMemberApi.fulfilled, (state, action) => {
      state.DeleteGroupMemberLoading = false;
      state.DeleteGroupMemberData = action.payload;
    });
    builder.addCase(DeleteGroupMemberApi.rejected, (state, action) => {
      state.DeleteGroupMemberLoading = false;
      state.isError = true;
    });
  },
});


export default DeleteGroupMemberSlice.reducer;
