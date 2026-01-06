import React, { useContext, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Platform } from "react-native";
import { Bell, Sun, Moon, ArrowLeft } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Import this
import getHeaderStyle from "../styles/Components/headerStyle";
import { ThemeContext } from "../components/ThemeContext";
import { darkLogo, MainLogo } from "../Assets/Images/index";
import { markAllAsRead } from "../Redux/Slice/NotificationSlice";

const AppHeader = ({
  navigation,
  title = "",                   
  showBackButton = false,       
  showNotification = true,     
  showThemeToggle = true,       
  onBackPress,                  
  onNotificationPress,         
  onThemeTogglePress         
}) => {
  const { colors, themeType, toggleTheme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets(); // iOS notch height nikalne ke liye
  
  // Style ko memoize kiya topInset ke saath
  const headerStyle = useMemo(() => getHeaderStyle(colors, insets.top), [colors, insets.top]);
  
  const dispatch = useDispatch();
  const { LoginData } = useSelector((state) => state.Login || {});
  const notificationList = useSelector((state) => state.Notifications.Notifications || []);

  const currentUserId = LoginData?.user?.id;

  const unreadCount = useMemo(() => {
    if (!notificationList || !currentUserId) return 0;
    return notificationList.filter((n) => n.userId === currentUserId && !n.read).length;
  }, [notificationList, currentUserId]);

  const iconColor = colors.theme; 
  const handleThemeToggle = onThemeTogglePress || toggleTheme;
  const appLogo = themeType === "dark" ? darkLogo : MainLogo;

  const handleNotificationClick = () => {
    if (currentUserId) {
      dispatch(markAllAsRead(currentUserId));
    }
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      navigation.navigate("notificationScreen");
    }
  };

  return (
    <>
      {/* StatusBar control based on theme */}
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={headerStyle.container}>
        <View style={headerStyle.leftSection}>
          {showBackButton ? (
            <TouchableOpacity
              onPress={onBackPress || (() => navigation.goBack())}
              style={{ paddingRight: 10 }}
            >
              <ArrowLeft color={iconColor} size={28} />
            </TouchableOpacity>
          ) : (
            <>
              <Image
                source={appLogo}
                style={headerStyle.logo}
                resizeMode="contain"
              />
            </>
          )}
          {title ? <Text style={headerStyle.tagline}>{title}</Text> : null}
        </View>

        <View style={headerStyle.rightSection}>
          {showThemeToggle && (
            <TouchableOpacity
              onPress={handleThemeToggle}
              style={{ marginRight: showNotification ? 15 : 0, padding: 5 }}
            >
              {themeType === 'dark' ? (
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
                <View style={[styles.badge, { borderColor: colors.background }]}>
                  <Text style={styles.badgeText}>
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
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