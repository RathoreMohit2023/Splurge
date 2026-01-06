import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "react-native-paper";
import {
  Bell,
  Check,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  Edit3,
  ChevronLeft,
  Trash2,
  X,
} from "lucide-react-native";

import getNotificationStyle from "../../styles/MainScreen/NotificationStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { markAsRead, clearNotifications, updateNotificationStatus } from "../../Redux/Slice/NotificationSlice";
import { SettleUpRespondApi } from "../../Redux/Api/SettleUpRespondApi";
import { GetPaymentLogApi } from "../../Redux/Api/GetPaymentLogApi";

const getIcon = (type, colors) => {
  switch (type) {
    case "settle_request": return <Wallet size={20} color={colors.primary} />;
    case "reminder": return <Edit3 size={20} color={colors.theme} />;
    case "debt": return <ArrowUpRight size={20} color={colors.error} />;
    case "alert": return <AlertTriangle size={20} color={colors.warning} />;
    default: return <Bell size={20} color={colors.Text} />;
  }
};

const NotificationScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  
  const styles = useMemo(() => getNotificationStyle(colors, themeType), [colors, themeType]);
  
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [snack, setSnack] = useState({ visible: false, message: "" });
  const showSnack = (message) => setSnack({ visible: true, message });

  const { LoginData } = useSelector((state) => state.Login || {});
  const rawNotifications = useSelector((state) => state.Notifications.Notifications);

  const currentUserId = LoginData?.user?.id;

  const userNotifications = useMemo(() => {
    if (!rawNotifications || !currentUserId) return [];
    return rawNotifications.filter(item => item.userId === currentUserId);
  }, [rawNotifications, currentUserId]);

  const fetchInitialData = () => {
    if (LoginData?.token) {
      dispatch(GetPaymentLogApi(LoginData.token));
    }
  };

  const handleClearAll = () => {
    if (currentUserId) {
      dispatch(clearNotifications(currentUserId));
    }
  };

  const handleAccept = async (item) => {
    const { data, id } = item;
    const { settle_payment_id, sender_id, receiver_id } = data;
    const token = LoginData?.token;
    if (!token) return;

    const formData = new FormData();
    formData.append("sender_id", sender_id);
    formData.append("receiver_id", receiver_id);
    formData.append("status", "accepted");
    formData.append("note", "Payment settled successfully");
    formData.append("settle_payment_id", settle_payment_id);                     

    try {
      const result = await dispatch(SettleUpRespondApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === "true") {
        showSnack(result?.message);
        dispatch(updateNotificationStatus({ id: id, status: 'accepted' }));
        fetchInitialData();
      } else {
        showSnack(result?.message || "Failed to accept");
      }
    } catch (error) {
      showSnack("Something went wrong. Please try again.");
    }
  };

  const handleDecline = async (item) => {
    const { data, id } = item;
    const { settle_payment_id, sender_id, receiver_id } = data;
    const token = LoginData?.token;
    if (!token) return;

    const formData = new FormData();
    formData.append("sender_id", sender_id);
    formData.append("receiver_id", receiver_id);
    formData.append("status", "rejected");
    formData.append("note", "Payment request declined");
    formData.append("settle_payment_id", settle_payment_id);

    try {
      const result = await dispatch(SettleUpRespondApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === "true") {
        showSnack("Request declined successfully");
        dispatch(updateNotificationStatus({ id: id, status: 'rejected' }));
        fetchInitialData();
      } else {
        showSnack(result?.message || "Failed to decline");
      }
    } catch (error) {
      showSnack("Something went wrong. Please try again.");
    }
  };

  // ✅ 4. Sections ab 'userNotifications' use karega
  const sections = useMemo(() => {
    if (!userNotifications || userNotifications.length === 0) return [];
    return [{ title: "New", data: userNotifications }];
  }, [userNotifications]);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, !item.read && styles.unreadCard]}
      onPress={() => dispatch(markAsRead(item.id))}
    >
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, !item.read && styles.unreadIconCircle]}>
          {getIcon(item.type, colors)}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.rowBetween}>
          <Text style={[styles.title, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>

        {item.type === "settle_request" && !item.status && (
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity onPress={() => handleAccept(item)} style={styles.btnAccept}>
              <Check size={14} color="#FFF" style={{ marginRight: 6 }} />
              <Text style={styles.btnTextWhite}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDecline(item)} style={styles.btnDecline}>
              <X size={14} color={colors.textSecondary} style={{ marginRight: 6 }} />
              <Text style={styles.btnTextDecline}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status && (
          <View style={[styles.statusTag, { 
            backgroundColor: item.status === 'accepted' ? 'rgba(5, 205, 153, 0.1)' : 'rgba(238, 93, 80, 0.1)' 
          }]}>
            <Text style={[styles.statusText, { 
              color: item.status === 'accepted' ? colors.success : colors.error 
            }]}>
              {item.status === 'accepted' ? "Accepted" : "Declined"}
            </Text>
          </View>
        )}
      </View>

      {!item.read && <View style={styles.dot} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={colors.theme} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* ✅ Use userNotifications length check */}
      {userNotifications.length > 0 && (
        <View style={styles.actionsRow}>
          <Text style={styles.subHeaderLabel}>RECENT</Text>
          <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
            <Trash2 size={14} color={colors.error} />
            <Text style={styles.clearBtnText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBg}>
              <Bell size={40} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>We'll let you know when something arrives.</Text>
          </View>
        }
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: "" })}
        duration={2000}
        style={styles.snackbar}
        theme={{ colors: { inversePrimary: colors.primary } }}
        action={{
          label: "OK",
          textColor: "#FFF",
          onPress: () => setSnack({ visible: false, message: "" }),
        }}
      >
        <Text style={{ color: "#FFF" }}>{snack.message}</Text>
      </Snackbar>
    </View>
  );
};

export default NotificationScreen;