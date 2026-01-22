import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { Platform, PermissionsAndroid, Alert } from "react-native";

// Ask Android 13+ Notification Permission
export const requestAndroidNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

// Firebase permission
export const requestFirebasePermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

// Combined Permission Function
export const requestPermissions = async () => {
  const androidPerm = await requestAndroidNotificationPermission();
  const firebasePerm = await requestFirebasePermission();

  console.log("Android Permission:", androidPerm);
  console.log("Firebase Permission:", firebasePerm);

  return androidPerm && firebasePerm;
};

const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("fcm_token", token);
      console.log("💾 Token Saved Locally:", token);
    } catch (error) {
      console.log("Storage Error:", error);
    }
  };

export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    if (!token) {
        token = await messaging().getToken(); // new token
        await storeToken(token);             // save it
      }
  
    return token;
  } catch (err) {
    console.log("Token error:", err);
    return null;
  }
};

export const onForegroundMessage = (callback) => {
  return messaging().onMessage(async remoteMessage => {
    console.log("📩 Foreground Message:", remoteMessage);
    
    // iOS par banner dikhane ke liye manually Alert dikhana padta hai
    if (Platform.OS === 'ios') {
       Alert.alert(
         remoteMessage.notification.title,
         remoteMessage.notification.body
       );
    }
    
    callback && callback(remoteMessage);
  });
};

export const onBackgroundMessage = (callback) => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("📩 Background:", remoteMessage);
    callback && callback(remoteMessage);
  });
};

export const onNotificationOpened = (callback) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log("📌 Tapped from Background:", remoteMessage);
    callback && callback(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log("🚀 Opened from Quit:", remoteMessage);
        callback && callback(remoteMessage);
      }
    });
};
