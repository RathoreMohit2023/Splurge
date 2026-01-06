import { createSlice } from '@reduxjs/toolkit';
import { EditProfileApi } from '../Api/EditProfileApi';

const EditProfileSlice = createSlice({
  name: 'EditProfile',
  initialState: {
    EditProfileLoading: false,
    isError: false,
    EditProfileData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(EditProfileApi.pending, (state, action) => {
      state.EditProfileLoading = true;
    });
    builder.addCase(EditProfileApi.fulfilled, (state, action) => {
      state.EditProfileLoading = false;
      state.EditProfileData = action.payload;
    });
    builder.addCase(EditProfileApi.rejected, (state, action) => {
      state.EditProfileLoading = false;
      state.isError = true;
    });
  },
});


export default EditProfileSlice.reducer;
