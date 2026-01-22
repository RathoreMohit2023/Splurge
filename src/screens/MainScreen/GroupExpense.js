import React, { useContext, useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Text, Avatar, Divider, Snackbar } from 'react-native-paper';
import {
  ArrowLeft,
  Trash2,
  Calendar,
  Receipt,
  Wallet,
  User,
  IndianRupee,
} from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../components/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';

// Import your CustomAlert and API
import CustomAlert from '../../components/CustomAlert'; // Adjust path if needed
import { DeleteGroupExpenseApi } from '../../Redux/Api/DeleteGroupExpenseAPi';
import { GetGroupExpenseApi } from '../../Redux/Api/GetGroupExpenseApi';

const getStyles = (colors, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingTop: insets.top + 10,
      backgroundColor: colors.background,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      zIndex: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
    },
    iconButton: {
      padding: 8,
      backgroundColor: colors.tintedThemeColor,
      borderRadius: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      flex: 1,
      textAlign: 'center',
      marginRight: 40,
    },
    scrollContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    heroContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 25,
    },
    iconCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.tintedThemeColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.theme,
    },
    amountLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '600',
      marginBottom: 5,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    totalAmount: {
      fontSize: 42,
      fontWeight: '800',
      color: colors.theme,
      marginBottom: 8,
      letterSpacing: -1,
    },
    description: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 15,
    },
    metaContainer: {
      flexDirection: 'row',
      backgroundColor: colors.tintedThemeColor,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignItems: 'center',
      gap: 15,
      borderWidth: 1,
      borderColor: colors.theme,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    metaText: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    dividerVertical: {
      width: 1,
      height: 20,
      backgroundColor: colors.border,
    },
    sectionContainer: {
      backgroundColor: colors.tintedThemeColor,
      borderRadius: 24,
      padding: 20,
      marginBottom: 25,
      borderWidth: 1,
      borderColor: colors.theme,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
    },
    splitRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
    },
    splitLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      backgroundColor: colors.background,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    avatarLabel: {
      color: colors.theme,
      fontWeight: 'bold',
      fontSize: 14,
    },
    memberInfo: {
      marginLeft: 14,
      flex: 1,
    },
    memberName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    youTag: {
      fontSize: 12,
      color: colors.theme,
      fontWeight: 'bold',
      marginTop: 2,
    },
    amountContainer: {
      alignItems: 'flex-end',
    },
    owedLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    owedAmount: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    actionsContainer: {
      flexDirection: 'row',
      gap: 15,
      marginBottom: 20,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 18,
    },
    deleteButton: {
      backgroundColor: '#FFE5E5',
      borderWidth: 1,
      borderColor: '#FFA3A3',
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

const GroupExpense = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(colors, insets), [colors, insets]);
  const route = useRoute();
  
  const { LoginData } = useSelector(state => state.Login || {});

  // Data from navigation
  const { expense, members } = route.params;

  // Local States
  const [alertVisible, setAlertVisible] = useState(false);
  const [snack, setSnack] = useState({ visible: false, message: '' });

  const payer = useMemo(
    () => members.find(m => m.user_id === expense.paid_by_user_id),
    [members, expense],
  );

  const isUserPayer = payer?.user_id === LoginData?.user?.id;
  const paidByName = isUserPayer ? 'You' : payer?.user?.fullname || 'Unknown';

  const handleBack = () => navigation.goBack();

  const handleDeleteClick = () => {
    setAlertVisible(true);
  };

  const onConfirmDelete = async () => {
    setAlertVisible(false);
    
    if (!LoginData?.token) {
        setSnack({ visible: true, message: 'Authorization token missing.' });
        return;
    }

    try {
        const result = await dispatch(
            DeleteGroupExpenseApi({  token: LoginData.token, id : expense.id })
        ).unwrap();

        if (result?.status === true || result?.status === 'true') {
            setSnack({ visible: true, message: result?.message });
             dispatch(GetGroupExpenseApi({ token: LoginData.token, id: expense.group_id }));
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
        } else {
            setSnack({ visible: true, message: result?.message || 'Failed to delete expense.' });
        }
    } catch (error) {
        setSnack({ visible: true, message: error?.message || 'Something went wrong.' });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={
          colors.background === '#080808' ? 'light-content' : 'dark-content'
        }
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expense Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={styles.iconCircle}>
            <IndianRupee size={28} color={colors.theme} />
          </View>
          <Text style={styles.amountLabel}>Total Bill</Text>
          <Text style={styles.totalAmount}>
            ₹{parseFloat(expense.amount).toLocaleString()}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {expense.description}
          </Text>

          {/* Meta Data Pill */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <User size={14} color={colors.theme} />
              <Text style={styles.metaText}>
                Paid by{' '}
                <Text style={{ fontWeight: '700', color: colors.theme }}>
                  {paidByName}
                </Text>
              </Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={styles.metaItem}>
              <Calendar size={14} color={colors.theme} />
              <Text style={styles.metaText}>{expense.date}</Text>
            </View>
          </View>
        </View>

        {/* Split Details Card */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Split Breakdown</Text>
            <Wallet size={18} color={colors.theme} />
          </View>

          {expense.splitexpense.map((split, index) => {
            const memberDetails = members.find(
              m => m.user_id === split.user_id,
            );
            const isCurrentUser =
              memberDetails?.user_id === LoginData?.user?.id;
            const memberName = isCurrentUser
              ? 'You'
              : memberDetails?.user?.fullname || 'Unknown';

            return (
              <View key={split.id}>
                <View style={styles.splitRow}>
                  <View style={styles.splitLeft}>
                    <View style={styles.avatarContainer}>
                      <Avatar.Text
                        size={42}
                        label={(memberName || 'NA')
                          .substring(0, 2)
                          .toUpperCase()}
                        style={[
                          styles.avatar,
                          isCurrentUser && { borderColor: colors.theme },
                        ]}
                        labelStyle={[
                          styles.avatarLabel,
                          isCurrentUser && { color: colors.theme },
                        ]}
                      />
                    </View>
                    <View style={styles.memberInfo}>
                      <Text
                        style={[
                          styles.memberName,
                          isCurrentUser && { color: colors.theme },
                        ]}
                      >
                        {memberName}
                      </Text>
                      {/* {isCurrentUser && (
                        <Text style={styles.youTag}>Admin</Text>
                      )} */}
                    </View>
                  </View>

                  <View style={styles.amountContainer}>
                    <Text style={styles.owedLabel}>Owes</Text>
                    <Text style={styles.owedAmount}>
                      ₹{parseFloat(split.owed_amount).toLocaleString()}
                    </Text>
                  </View>
                </View>
                {index < expense.splitexpense.length - 1 && (
                  <Divider style={{ backgroundColor: colors.separator }} />
                )}
              </View>
            );
          })}
        </View>

        {/* Action Buttons */}
        {
          expense.created_by_user_id === LoginData?.user?.id && (
            <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            activeOpacity={0.7}
            onPress={handleDeleteClick}>
            <Trash2 size={20} color={colors.error} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
          )
        }
       
      </ScrollView>

      {/* Custom Alert Modal */}
      <CustomAlert 
        visible={alertVisible}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        showCancel={true}
        cancelText="Cancel"
        confirmText="Delete"
        onCancel={() => setAlertVisible(false)}
        onConfirm={onConfirmDelete}
      />

      {/* Snackbar for Feedback */}
      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: '' })}
        duration={2000}
        style={{
          backgroundColor: colors.card,
          marginBottom: insets.bottom + 20,
        }}
        theme={{ colors: { inversePrimary: colors.theme } }}
        action={{
          label: 'OK',
          textColor: colors.theme,
          onPress: () => setSnack({ visible: false, message: '' }),
        }}
      >
        <Text style={{ color: colors.text }}>{snack.message}</Text>
      </Snackbar>

    </View>
  );
};

export default GroupExpense;