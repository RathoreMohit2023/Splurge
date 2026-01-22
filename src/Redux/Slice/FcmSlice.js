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
    clearFcmToken: (state) => { // 💡 Add this
      state.fcmToken = null;
    },
  },
});

export const { setFcmToken, clearFcmToken} = fcmSlice.actions;
export default fcmSlice.reducer;