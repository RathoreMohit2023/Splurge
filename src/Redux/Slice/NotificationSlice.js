import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Notifications: [],
};

const NotificationSlice = createSlice({
  name: 'Notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.Notifications.unshift(action.payload);
    },
    markAsRead: (state, action) => {
      const index = state.Notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        state.Notifications[index].read = true;
      }
    },
    markAllAsRead: (state, action) => {
      const userId = action.payload;
      state.Notifications.forEach(n => {
        if (n.userId === userId) {
          n.read = true;
        }
      });
    },
    updateNotificationStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.Notifications.findIndex(n => n.id === id);
      if (index !== -1) {
        state.Notifications[index].status = status;
        state.Notifications[index].read = true;
      }
    },
    clearNotifications: (state, action) => {
      const userId = action.payload;
      if (userId) {
        state.Notifications = state.Notifications.filter(n => n.userId !== userId);
      } else {
        state.Notifications = [];
      }
    }
  },
});

export const { 
  addNotification, 
  markAsRead, 
  markAllAsRead, 
  updateNotificationStatus, 
  clearNotifications 
} = NotificationSlice.actions;

export default NotificationSlice.reducer;