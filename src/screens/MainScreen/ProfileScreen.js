// ProfileScreen.js

import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import { Text, Avatar, Snackbar, Divider } from 'react-native-paper';
import {
  User,
  Mail,
  Bell,
  ChevronRight,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Phone,
  X,
  Trash2,
  Lock,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';

import getProfileStyle from '../../styles/MainScreen/ProfileStyle';
import { ThemeContext } from '../../components/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { Img_url } from '../../Redux/NWConfig';
import CustomAlert from '../../components/CustomAlert';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { logout } from '../../Redux/Slice/LoginSlice';
import { DeleteAccountApi } from '../../Redux/Api/GetDeleteAccountApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearFcmToken } from '../../Redux/Slice/FcmSlice';
import messaging from '@react-native-firebase/messaging';

const ProfileScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getProfileStyle(colors), [colors]);
  const { GetUserDetailsData } = useSelector(state => state.GetUserDetails);
  const { GetTransactionData } = useSelector(state => state.GetTransaction);
  const { GetFriendsData } = useSelector(state => state.GetFriends || {});
  const { DeleteAccountLoading, DeleteAccountData } = useSelector(
    state => state.DeleteAccount,
  );
  const { LoginData } = useSelector(state => state.Login || {});

  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [snack, setSnack] = useState({ visible: false, message: '' });
  const [totalFriends, setTotalFriends] = useState(0);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isLogoutAlertVisible, setLogoutAlertVisible] = useState(false);
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);

  const insets = useSafeAreaInsets();
  const allTransactions = GetTransactionData?.get_transactions || [];

  const menuSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Personal Information',
          onPress: () => navigation.navigate('PersonalInfoScreen'),
        },
        {
          icon: Bell,
          label: 'Notifications',
          onPress: () => navigation.navigate('notificationScreen'),
        },
         {
          icon: Lock,
          label: 'Change Password',
          onPress: () => navigation.navigate('changePassword'),
        },
         {
          icon: Trash2,
          label: 'Delete Account',
          onPress: () => setDeleteAlertVisible(true),
          isDanger: true,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          onPress: () => navigation.navigate('HelpSupport'),
        },
        {
          icon: Shield,
          label: 'Terms & Policies',
          onPress: () => navigation.navigate('TermsPolicies'),
        },
      ],
    },
  ];

  useEffect(() => {
    if (GetFriendsData?.friends?.length > 0) {
      setTotalFriends(GetFriendsData?.friends?.length);
    }
  }, [GetFriendsData]);

  const { currentMonthTotal } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const filteredTransactions = allTransactions.filter(t => {
      if (!t.date) return false;
      const txnDate = new Date(t.date);
      return (
        txnDate.getFullYear() === currentYear &&
        txnDate.getMonth() === currentMonth
      );
    });

    const total = filteredTransactions.reduce(
      (sum, t) => sum + parseFloat(t.amount || 0),
      0,
    );

    return { currentMonthTotal: total };
  }, [allTransactions]);

  const stats = [
    {
      label: 'Total Spent',
      value: `₹${currentMonthTotal.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: CreditCard,
      color: '#FFD700',
    },
    { label: 'Friends', value: totalFriends, icon: User, color: '#4FB6FF' },
  ];

  useEffect(() => {
    if (GetUserDetailsData?.user_details?.length > 0) {
      setUser(GetUserDetailsData?.user_details[0]);
    }
  }, [GetUserDetailsData]);

  const handleLogout = () => setLogoutAlertVisible(true);
const confirmLogout = async () => {
  setLogoutAlertVisible(false);
  try {
    // 1. Firebase messaging token delete karein (Server side cleanup)
    // Isse server ko pata chal jayega ki ye device ab is user ke liye active nahi hai
    await messaging().deleteToken();

    // 2. Google Sign-Out
    await GoogleSignin.signOut();

    // 3. Local Storage se token hatayein
    await AsyncStorage.removeItem('fcm_token');

    // 4. Redux state se FCM token clear karein
    dispatch(clearFcmToken());

    // 5. User logout action dispatch karein
    dispatch(logout());

    console.log('Logged out and FCM token cleared successfully');
  } catch (error) {
    console.error('Failed to sign out: ', error);
    // Fallback: Agar token delete fail bhi ho jaye, tab bhi user ko logout kar dein
    dispatch(logout());
  }
};

  const confirmDeleteAccount = async () => {
    setDeleteAlertVisible(false);
    try {
      const token = LoginData?.token;
      const email = user?.email;
      const postData = {
        email: email,
      };

      if (!token || !email) {
        setSnack({
          visible: true,
          message: 'Session expired. Please login again.',
        });
        return;
      }

      const res = await dispatch(
        DeleteAccountApi({ token, postData }),
      ).unwrap();

      if (res?.status === true) {
        try {
          await GoogleSignin.signOut();
        } catch (e) {}

        await AsyncStorage.multiRemove([
          "savedEmail",
          "savedPassword"
        ])
        dispatch(logout());
      } else {
        setSnack({
          visible: true,
          message: res?.message || 'Failed to delete account',
        });
      }
    } catch (error) {
      console.log('Delete account error:', error);
      setSnack({
        visible: true,
        message: 'Something went wrong. Try again.',
      });
    }
  };

  const profileImages = useMemo(() => {
    if (user?.profile_photo) {
      return [{ url: Img_url + user?.profile_photo }];
    }
    return [];
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
      >
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
          <View style={styles.profileHeader}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => user?.profile_photo && setImageModalVisible(true)}
              activeOpacity={0.8}
            >
              {user?.profile_photo ? (
                <Image
                  source={{ uri: Img_url + user?.profile_photo }}
                  style={styles.profileImage}
                />
              ) : (
                <Avatar.Text
                  size={80}
                  label={user?.fullname
                    ?.split(' ')
                    .map(n => n[0])
                    .join('')}
                  style={styles.avatar}
                />
              )}
            </TouchableOpacity>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.fullname}</Text>
              <Text style={styles.userHandle}>{user?.code}</Text>

              {/* Corrected: replaced div with View */}
              <View style={styles.contactRow}>
                <Phone size={14} color={colors.textSecondary} />
                <Text style={styles.contactText}>{user?.mobile}</Text>
              </View>

              <View style={styles.contactRow}>
                <Mail size={14} color={colors.textSecondary} />
                <Text style={styles.contactText}>{user?.email}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <View key={idx} style={styles.statCard}>
                <View style={[styles.iconBox, { backgroundColor: '#000000' }]}>
                  <Icon size={20} color={s.color} />
                </View>
                <View>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {menuSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, i) => (
                <View key={i}>
                  {/* <TouchableOpacity
                    style={styles.menuItem}
                    onPress={item.onPress}
                  > */}
                  <TouchableOpacity
                    style={styles.menuItem}
                    disabled={item.isDanger && DeleteAccountLoading}
                    onPress={item.onPress}
                  >
                    <View style={styles.menuLeft}>
                      <View
                        style={[
                          styles.menuIconBox,
                          item.isDanger && {
                            backgroundColor: 'rgba(255, 68, 68, 0.1)',
                          },
                        ]}
                      >
                        <item.icon
                          size={18}
                          color={item.isDanger ? colors.error : colors.white}
                        />
                      </View>
                      <Text
                        style={[
                          styles.menuLabel,
                          item.isDanger && { color: colors.error },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <ChevronRight size={18} color={colors.textSecondary} />
                  </TouchableOpacity>
                  {i < section.items.length - 1 && (
                    <Divider style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={18} color={colors.error} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals & Alerts */}
      <Modal
        visible={isImageModalVisible}
        transparent
        onRequestClose={() => setImageModalVisible(false)}
      >
       <ImageViewer
          imageUrls={profileImages}
          enableSwipeDown
          onSwipeDown={() => setImageModalVisible(false)}
          renderHeader={() => (
            <TouchableOpacity
              style={[styles.closeModalBtn, { top: insets.top + 10 }]}
              onPress={() => setImageModalVisible(false)}
            >
              <X size={24} color="white" />
            </TouchableOpacity>
          )}
        />
      </Modal>

      <CustomAlert
        visible={isLogoutAlertVisible}
        title="Logout"
        message="Are you sure you want to logout?"
        showCancel
        confirmText="Logout"
        onCancel={() => setLogoutAlertVisible(false)}
        onConfirm={confirmLogout}
      />

      <CustomAlert
        visible={isDeleteAlertVisible}
        title="Delete Account"
        message="Are you sure? This action cannot be undone."
        showCancel
        confirmText="Delete"
        onCancel={() => setDeleteAlertVisible(false)}
        onConfirm={confirmDeleteAccount}
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: '' })}
        duration={2000}
        style={{
          backgroundColor: colors.surface,
          marginBottom: insets.bottom + 10,
        }}
      >
        <Text style={{ color: colors.text }}>{snack.message}</Text>
      </Snackbar>
    </View>
  );
};

export default ProfileScreen;
