import React, { useEffect, useMemo, useRef } from "react"; // useRef import karein
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "../src/navigation/rootNavigator";
import { PaperProvider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import notifee from '@notifee/react-native';

import { requestPermissions, getFCMToken, onForegroundMessage, onBackgroundMessage, onNotificationOpened } from './services/FcmService';
import { setFcmToken } from './Redux/Slice/FcmSlice';
import { addNotification } from './Redux/Slice/NotificationSlice';
import { GetPaymentLogApi } from "./Redux/Api/GetPaymentLogApi";

import AuthNavigator from "./navigation/AuthNavigator";
import AppNavigator from "./navigation/AppNavigator";

const MainApp = () => {
  const { LoginData } = useSelector(state => state.Login);
  const { Notifications } = useSelector(state => state.Notifications);
  const dispatch = useDispatch();

  const currentUserId = LoginData?.user?.id || LoginData?.user_id;
  
  // 1. Current User ID aur Token ko Ref mein store karein
  const currentUserRef = useRef(currentUserId);
  const tokenRef = useRef(LoginData?.token);

  // 2. Jab bhi LoginData change ho, Ref update karein
  useEffect(() => {
    currentUserRef.current = currentUserId;
    tokenRef.current = LoginData?.token;
  }, [currentUserId, LoginData]);

  const unreadCount = useMemo(() => {
    if (!Notifications || !currentUserId) return 0;
    return Notifications.filter(n => n.userId === currentUserId && !n.read).length;
  }, [Notifications, currentUserId]);

  useEffect(() => {
    const updateBadge = async () => {
      try {
        if (currentUserId) {
          await notifee.setBadgeCount(unreadCount);
        } else {
          await notifee.setBadgeCount(0);
        }
      } catch (error) {
        // console.log("Badge Error:", error);
      }
    };
    updateBadge();
  }, [unreadCount, currentUserId]);

  // 3. Notification Handler ab Ref ki value use karega
  const handleNewNotification = (remoteMessage) => {
    if (!remoteMessage) return;
    
    // Yahan Ref use karein, taaki latest value mile bina re-render ke
    const userId = currentUserRef.current;
    const token = tokenRef.current;

    if (!userId) return; 

    const newNotif = {
      id: remoteMessage.messageId,
      title: remoteMessage.notification?.title || "New Notification",
      message: remoteMessage.notification?.body || "",
      type: remoteMessage.data?.type || "default",
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      read: false,
      data: remoteMessage.data,
      userId: userId, 
    };

    dispatch(addNotification(newNotif));
    
    if (token) {
      dispatch(GetPaymentLogApi(token));
    }
  };

useEffect(() => {
  let unsubscribeForeground = null;

  const initNotifications = async () => {
    const granted = await requestPermissions();
    if (!granted) return;

    // Hamesha fresh token lene ki koshish karein
    const token = await getFCMToken();
    dispatch(setFcmToken(token));

    unsubscribeForeground = onForegroundMessage(msg => {
      handleNewNotification(msg);
    });

    // background aur opened handlers ko cleanup ke saath rakhein
    onNotificationOpened(msg => {
      handleNewNotification(msg);
    });
  };

  initNotifications();

  return () => {
    if (unsubscribeForeground) unsubscribeForeground();
  };
}, [LoginData?.user?.id]); // 💡 User change hote hi ye refresh hoga

  return (
    <PaperProvider>
      <NavigationContainer>
      {LoginData?.token ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainApp;