import { createSlice } from '@reduxjs/toolkit';
import { AddGroupApi } from '../Api/AddGroupApi';

const AddGroupGetPaymentlice = createSlice({
  name: 'AddGroup',
  initialState: {
    AddGroupLoading: false,
    isError: false,
    AddGroupData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddGroupApi.pending, (state, action) => {
      state.AddGroupLoading = true;
    });
    builder.addCase(AddGroupApi.fulfilled, (state, action) => {
      state.AddGroupLoading = false;
      state.AddGroupData = action.payload;
    });
    builder.addCase(AddGroupApi.rejected, (state, action) => {
      state.AddGroupLoading = false;
      state.isError = true;
    });
  },
});


export default AddGroupGetPaymentlice.reducer;
