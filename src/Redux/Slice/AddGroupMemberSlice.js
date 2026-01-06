import { createSlice } from '@reduxjs/toolkit';
import { AddGroupMemberApi } from '../Api/AddGroupMemberApi';

const AddGroupMemberSlice = createSlice({
  name: 'AddGroupMember',
  initialState: {
    AddGroupMemberLoading: false,
    isError: false,
    AddGroupMemberData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddGroupMemberApi.pending, (state, action) => {
      state.AddGroupMemberLoading = true;
    });
    builder.addCase(AddGroupMemberApi.fulfilled, (state, action) => {
      state.AddGroupMemberLoading = false;
      state.AddGroupMemberData = action.payload;
    });
    builder.addCase(AddGroupMemberApi.rejected, (state, action) => {
      state.AddGroupMemberLoading = false;
      state.isError = true;
    });
  },
});


export default AddGroupMemberSlice.reducer;
