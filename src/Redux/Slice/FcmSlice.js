import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fcmToken: null,
};

const fcmSlice = createSlice({
  name: 'Fcm',
  initialState,
  reducers: {
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
  },
});

export const { setFcmToken } = fcmSlice.actions;
export default fcmSlice.reducer;