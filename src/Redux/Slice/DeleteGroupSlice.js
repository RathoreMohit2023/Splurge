import { createSlice } from '@reduxjs/toolkit';
import { DeleteGroupApi } from '../Api/DeleteGroupApi';

const DeleteGroupSlice = createSlice({
  name: 'DeleteGroup',
  initialState: {
    DeleteGroupLoading: false,
    isError: false,
    DeleteGroupData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteGroupApi.pending, (state, action) => {
      state.DeleteGroupLoading = true;
    });
    builder.addCase(DeleteGroupApi.fulfilled, (state, action) => {
      state.DeleteGroupLoading = false;
      state.DeleteGroupData = action.payload;
    });
    builder.addCase(DeleteGroupApi.rejected, (state, action) => {
      state.DeleteGroupLoading = false;
      state.isError = true;
    });
  },
});


export default DeleteGroupSlice.reducer;
