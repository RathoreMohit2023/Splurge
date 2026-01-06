import { createSlice } from '@reduxjs/toolkit';
import { LoginApi, GoogleLoginApi } from '../Api/LoginApi';
import { Alert } from 'react-native';

const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    LoginLoading: false,
    isError: false,
    LoginData: null, // array se better object
  },

  // 1. Add the 'reducers' key for synchronous actions
  reducers: {
    // Define the logout action
    logout: (state) => {
      state.LoginData = null; // Set LoginData back to its initial state
    },
  },

  extraReducers: (builder) => {
    /* ================= NORMAL LOGIN ================= */
    builder.addCase(LoginApi.pending, (state) => {
      state.LoginLoading = true;
      state.isError = false;
    });

    builder.addCase(LoginApi.fulfilled, (state, action) => {
      state.LoginLoading = false;
      state.LoginData = action.payload;
    });

    builder.addCase(LoginApi.rejected, (state) => {
      state.LoginLoading = false;
      state.isError = true;
      Alert.alert("Error", "Login failed");
    });

    /* ================= GOOGLE LOGIN ================= */
    builder.addCase(GoogleLoginApi.pending, (state) => {
      state.LoginLoading = true;
      state.isError = false;
    });

    builder.addCase(GoogleLoginApi.fulfilled, (state, action) => {
      state.LoginLoading = false;
      state.LoginData = action.payload; // 👈 SAME STATE
    });

    builder.addCase(GoogleLoginApi.rejected, (state) => {
      state.LoginLoading = false;
      state.isError = true;
      Alert.alert("Error", "Google login failed");
    });
  },
});

// 2. Export the newly created action from the slice's actions
export const { logout } = LoginSlice.actions;

export default LoginSlice.reducer;