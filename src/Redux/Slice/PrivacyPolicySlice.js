import { createSlice } from '@reduxjs/toolkit';
import { PrivacyPolicyApi } from '../Api/PrivacyPolicyApi';

const PrivacyPolicySlice = createSlice({
  name: 'PrivacyPolicy',
  initialState: {
    PrivacyPolicyLoading: false,
    isError: false,
    PrivacyPolicyData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(PrivacyPolicyApi.pending, (state, action) => {
      state.PrivacyPolicyLoading = true;
    });
    builder.addCase(PrivacyPolicyApi.fulfilled, (state, action) => {
      state.PrivacyPolicyLoading = false;
      state.PrivacyPolicyData = action.payload;
    });
    builder.addCase(PrivacyPolicyApi.rejected, (state, action) => {
      state.PrivacyPolicyLoading = false;
      state.isError = true;
    });
  },
});


export default PrivacyPolicySlice.reducer;
