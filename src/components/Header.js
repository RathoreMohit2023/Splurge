import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Linking,
} from "react-native";
import { Bell, Sun, Moon, ArrowLeft } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getHeaderStyle from "../styles/Components/headerStyle";
import { ThemeContext } from "../components/ThemeContext";
import { darkLogo, MainLogo } from "../Assets/Images/index";
import { markAllAsRead } from "../Redux/Slice/NotificationSlice";
import CustomAlert from "./CustomAlert";

const AppHeader = ({
  navigation,
  title = "",
  showBackButton = false,
  showNotification = true,
  showThemeToggle = true,
  onBackPress,
  onNotificationPress,
  onThemeTogglePress,
}) => {
  const { colors, themeType, toggleTheme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // State for managing the custom alert
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});

  const headerStyle = useMemo(
    () => getHeaderStyle(colors, insets.top),
    [colors, insets.top]
  );

  const { LoginData } = useSelector((state) => state.Login || {});
  const notificationList = useSelector(
    (state) => state.Notifications.Notifications || []
  );
  const currentUserId = LoginData?.user?.id;

  const unreadCount = useMemo(() => {
    if (!notificationList || !currentUserId) return 0;
    return notificationList.filter((n) => n.userId === currentUserId && !n.read)
      .length;
  }, [notificationList, currentUserId]);

  const iconColor = colors.theme;
  const handleThemeToggle = onThemeTogglePress || toggleTheme;
  const appLogo = themeType === "dark" ? darkLogo : MainLogo;

  const requestAndroidNotificationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      try {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        return result;
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        return PermissionsAndroid.RESULTS.DENIED;
      }
    }
    return PermissionsAndroid.RESULTS.GRANTED;
  };

  const handleNotificationClick = async () => {
    const result = await requestAndroidNotificationPermission();

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      if (currentUserId) {
        dispatch(markAllAsRead(currentUserId));
      }
      if (onNotificationPress) {
        onNotificationPress();
      } else {
        navigation.navigate("notificationScreen");
      }
    } else if (result === PermissionsAndroid.RESULTS.DENIED) {
      setAlertConfig({
        title: "Permission Denied",
        message: "To receive notifications, you need to grant permission. Please try again.",
        confirmText: "OK",
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
    } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      setAlertConfig({
        title: "Permission Blocked",
        message: "To receive notifications, please enable the permission from the app settings.",
        showCancel: true,
        confirmText: "Open Settings",
        onConfirm: () => {
          Linking.openSettings();
          setAlertVisible(false);
        },
        onCancel: () => setAlertVisible(false),
      });
      setAlertVisible(true);
    }
  };

  return (
    <>
      <StatusBar
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <View style={headerStyle.container}>
        {/* ... (rest of your header UI) ... */}
         <View style={headerStyle.leftSection}>
          {showBackButton ? (
            <TouchableOpacity
              onPress={onBackPress || (() => navigation.goBack())}
              style={{ paddingRight: 10 }}
            >
              <ArrowLeft color={iconColor} size={28} />
            </TouchableOpacity>
          ) : (
            <Image
              source={appLogo}
              style={headerStyle.logo}
              resizeMode="contain"
            />
          )}
          {title ? <Text style={headerStyle.tagline}>{title}</Text> : null}
        </View>

        <View style={headerStyle.rightSection}>
          {showThemeToggle && (
            <TouchableOpacity
              onPress={handleThemeToggle}
              style={{ marginRight: showNotification ? 15 : 0, padding: 5 }}
            >
              {themeType === "dark" ? (
                <Sun color={iconColor} size={26} />
              ) : (
                <Moon color={iconColor} size={26} />
              )}
            </TouchableOpacity>
          )}

          {showNotification && (
            <TouchableOpacity
              onPress={handleNotificationClick}
              style={styles.notificationBtn}
            >
              <Bell color={iconColor} size={26} />
              {unreadCount > 0 && (
                <View
                  style={[styles.badge, { borderColor: colors.background }]}
                >
                  <Text style={styles.badgeText}>
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      <CustomAlert
        visible={isAlertVisible}
        {...alertConfig}
      />
    </>
  );
};

const styles = StyleSheet.create({
  notificationBtn: {
    position: 'relative',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 2,
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});


export default AppHeader;