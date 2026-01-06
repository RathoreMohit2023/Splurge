import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {
  Text,
  Avatar,
  Snackbar,
  ProgressBar,
  Divider,
} from 'react-native-paper';
import {
  ArrowLeft,
  Plus,
  UserPlus,
  Trash2,
  Receipt,
  TrendingUp,
  ArrowRightLeft,
  IndianRupee,
  LogOut,
  History,
} from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

// Components
import AddGroupMemberModal from '../../Modals/AddGroupMemberModal';
import AddGroupExpenseModal from '../../Modals/AddGroupExpenseModal';
import getGroupDetailsStyle from '../../styles/MainScreen/groupDetailsStyle';
import DashedLoader from '../../components/DashedLoader';
import CustomAlert from '../../components/CustomAlert';
import { ThemeContext } from '../../components/ThemeContext';

// API
import { GetGroupMembersApi } from '../../Redux/Api/GetGroupMemberApi';
import { AddGroupMemberApi } from '../../Redux/Api/AddGroupMemberApi';
import { AddGroupExpenseApi } from '../../Redux/Api/AddGroupExpenseApi';
import { GetGroupExpenseApi } from '../../Redux/Api/GetGroupExpenseApi';
import { DeleteGroupMemberApi } from '../../Redux/Api/DeleteGroupMembersApi';
import { Img_url } from '../../Redux/NWConfig';
import { GetGroupsApi } from '../../Redux/Api/GetGroupsAPi';
import { DeleteGroupApi } from '../../Redux/Api/DeleteGroupApi';

const GroupDetails = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getGroupDetailsStyle(colors), [colors]);
  const dispatch = useDispatch();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const group = route?.params?.group;
  const [isStillMember, setIsStillMember] = useState(true);

  // Redux Selectors
  const { GetFriendsData } = useSelector(state => state.GetFriends || {});
  const { GetGroupMembersData, GetGroupMembersLoading } = useSelector(
    state => state.GetGroupMembers || {},
  );
  const { LoginData } = useSelector(state => state.Login || {});
  const { GetGroupExpenseData, GetGroupExpenseLoading } = useSelector(
    state => state.GetGroupExpense || {},
  );
  const { AddGroupExpenseLoading } = useSelector(
    state => state.AddGroupExpense || {},
  );

  const loading =
    GetGroupExpenseLoading || AddGroupExpenseLoading || GetGroupMembersLoading;

  // Local State
  const [expenseFormOpen, setExpenseFormOpen] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [snack, setSnack] = useState({ visible: false, message: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [actionType, setActionType] = useState('');
  const [deleteMember, setDeleteMember] = useState(null);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    btnText: '',
  });
  console.log(groupMembers, 'groupMembers');

  const fetchGroupData = () => {
    if (LoginData?.token && group?.id) {
      dispatch(GetGroupExpenseApi({ token: LoginData.token, id: group.id }));
      dispatch(GetGroupMembersApi(LoginData.token));
      // dispatch(GetGroupsApi(LoginData.token));
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [group]);

  // --- 2. Process Group Members ---
  // --- 2. Process Group Members ---
  useEffect(() => {
    // Check if the data is loaded and is an array
    if (GetGroupMembersData?.members && Array.isArray(GetGroupMembersData.members) && group?.id) {
      const filteredMembers = GetGroupMembersData.members.filter(
        member => String(member.group_id) === String(group.id),
      );
      setGroupMembers(filteredMembers);
  
      // *** ADD THIS LOGIC ***
      // After updating members, verify if the current user is still in the list.
      const currentUserIsMember = filteredMembers.some(
        member => member.user_id === LoginData?.user?.id
      );
      
      // Only update the status if the API call is not loading to avoid incorrect states
      if (!GetGroupMembersLoading) {
          setIsStillMember(currentUserIsMember);
      }
      // *** END OF ADDED LOGIC ***
  
    } else if (!GetGroupMembersLoading) {
      // If members data is null or not an array after loading, user is not a member.
      setGroupMembers([]);
      setIsStillMember(false);
    }
  }, [GetGroupMembersData, group, LoginData?.user?.id, GetGroupMembersLoading]); // Add dependencies

  // --- 3. Process Expenses ---
  useEffect(() => {
    if (GetGroupExpenseData?.group) {
      setGroupExpenses(GetGroupExpenseData.group);
    }
  }, [GetGroupExpenseData]);

  // --- 4. Process Friends ---
  useEffect(() => {
    if (GetFriendsData?.friends) {
      setFriendList(GetFriendsData.friends);
    }
  }, [GetFriendsData]);

  // --- 5. Determine Current User Role ---
  const currentUserMemberObj = useMemo(() => {
    return groupMembers.find(m => m.user_id === LoginData?.user?.id);
  }, [groupMembers, LoginData]);

  const isCurrentUserAdmin =
    currentUserMemberObj?.role === 'admin' ||
    group?.group_admin == LoginData?.user?.id;

  // --- 6. Calculations (Settlements & Stats) ---
  const { totalSpent, remaining, percentage, memberStats, settlements } =
    useMemo(() => {
      let total = 0;
      const balances = {};
      const personalSpent = {};

      groupMembers.forEach(m => {
        balances[m.user_id] = 0;
        personalSpent[m.user_id] = 0;
      });

      groupExpenses.forEach(exp => {
        const amount = parseFloat(exp.amount);
        total += amount;

        if (balances[exp.paid_by_user_id] !== undefined) {
          balances[exp.paid_by_user_id] += amount;
        }

        if (exp.splitexpense && Array.isArray(exp.splitexpense)) {
          exp.splitexpense.forEach(split => {
            const owed = parseFloat(split.owed_amount);
            if (balances[split.user_id] !== undefined) {
              balances[split.user_id] -= owed;
            }
            if (personalSpent[split.user_id] !== undefined) {
              personalSpent[split.user_id] += owed;
            }
          });
        }
      });

      const budget = parseFloat(group?.group_budget) || 0;
      const perc = budget > 0 ? Math.min(100, (total / budget) * 100) : 0;
      const rem = budget - total;

      let debtors = [];
      let creditors = [];

      Object.keys(balances).forEach(userId => {
        const val = balances[userId];
        if (val < -0.01)
          debtors.push({ userId: parseInt(userId), amount: val });
        if (val > 0.01)
          creditors.push({ userId: parseInt(userId), amount: val });
      });

      debtors.sort((a, b) => a.amount - b.amount);
      creditors.sort((a, b) => b.amount - a.amount);

      const plan = [];
      let i = 0;
      let j = 0;

      while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        const amount = Math.min(Math.abs(debtor.amount), creditor.amount);

        const debtorName =
          groupMembers.find(m => m.user_id === debtor.userId)?.user?.fullname ||
          'Unknown';
        const creditorName =
          groupMembers.find(m => m.user_id === creditor.userId)?.user
            ?.fullname || 'Unknown';

        plan.push({ from: debtorName, to: creditorName, amount: amount });

        debtor.amount += amount;
        creditor.amount -= amount;

        if (Math.abs(debtor.amount) < 0.01) i++;
        if (creditor.amount < 0.01) j++;
      }

      return {
        totalSpent: total,
        remaining: rem,
        percentage: perc,
        memberStats: { balances, personalSpent },
        settlements: plan,
      };
    }, [groupExpenses, groupMembers, group]);

  // --- Handlers ---

  const handleAddMember = async selectedFriends => {
    const token = LoginData?.token;
    if (!token || !group?.id) return showSnack('Missing info.');

    let finalMembersPayload = [];

    // If group is technically empty (first time), make current user admin
    if (groupMembers.length === 0) {
      finalMembersPayload.push({
        user_id: LoginData?.user?.id,
        role: 'admin',
      });
    }

    const newMembers = selectedFriends.map(friend => ({
      user_id: friend.id,
      role: 'member',
    }));

    finalMembersPayload = [...finalMembersPayload, ...newMembers];

    if (finalMembersPayload.length === 0)
      return showSnack('No members selected.');

    const apiPayload = { group_id: group.id, members: finalMembersPayload };

    try {
      const result = await dispatch(
        AddGroupMemberApi({ payload: apiPayload, token }),
      ).unwrap();
      if (result?.status === true || result?.status === 'true') {
        showSnack(result?.message || 'Members added successfully!');
        dispatch(GetGroupExpenseApi({ token: LoginData.token, id: group.id }));
        dispatch(GetGroupMembersApi(LoginData.token));
        setModalVisible(false);
      } else {
        showSnack(result?.message || 'Failed to add members.');
        dispatch(GetGroupExpenseApi({ token: LoginData.token, id: group.id }));
      }
    } catch (error) {
      showSnack(error?.message || 'Something went wrong.');
    }
  };
  const handleViewExpense = expense => {
    navigation.navigate('GroupExpense', {
      expense: expense,
      members: groupMembers,
    });
  };

  const handleSaveExpense = async expenseData => {
    const token = LoginData?.token;
    if (!token || !group?.id) return showSnack('Missing info.');

    const payer = groupMembers.find(
      m => m.user?.fullname === expenseData.paidBy,
    );
    if (!payer) return showSnack('Payer not found.');

    const apiPayload = {
      description: expenseData.description,
      amount: expenseData.amount,
      paid_by_user_id: payer.user_id,
      split_among_user_id: expenseData.splitAmong,
      date: expenseData.date,
    };
    try {
      const result = await dispatch(
        AddGroupExpenseApi({ payload: apiPayload, token, groupId: group.id }),
      ).unwrap();
      if (result?.status === true || result?.status === 'true') {
        showSnack('Expense added successfully!');
        setExpenseFormOpen(false);
        dispatch(GetGroupExpenseApi({ token: LoginData.token, id: group.id }));
      } else {
        showSnack(result?.message || 'Failed.');
        dispatch(GetGroupExpenseApi({ token: LoginData.token, id: group.id }));
      }
    } catch (error) {
      showSnack(error?.message || 'Something went wrong.');
    }
  };

  // --- Logic for Delete/Leave ---
  const handleDeleteMember = async member => {
    setDeleteMember(member);
    const isMe = member.user_id === LoginData?.user?.id;

    if (isMe) {
      setAlertConfig({
        title: 'Leave Group',
        message: 'Are you sure you want to leave this group?',
        btnText: 'Leave',
      });
    } else {
      setAlertConfig({
        title: 'Remove Member',
        message: `Are you sure you want to remove ${member.user?.fullname}?`,
        btnText: 'Remove',
      });
    }
    setAlertVisible(true);
  };

  const handleDeleteGroupPrompt = () => {
    setActionType('group');
    setAlertConfig({
      title: 'Delete Group',
      message:
        'Are you sure you want to permanently delete this group? All data and expenses will be lost.',
      btnText: 'Delete Group',
    });
    setAlertVisible(true);
  };

  const finalDeleteGroup = async () => {
    const token = LoginData?.token;
    if (!token || !group?.id) return showSnack('Missing info.');
    try {
      const result = await dispatch(
        DeleteGroupApi({ token, id: group.id }),
      ).unwrap();

      if (result?.status === true || result?.status === 'true') {
        showSnack(result?.message || 'Group deleted successfully');
        setAlertVisible(false);
        dispatch(GetGroupsApi(LoginData.token));
        navigation.goBack();
      } else {
        showSnack(result?.message || 'Failed to delete group.');
        dispatch(GetGroupsApi(LoginData.token));
      }
    } catch (error) {
      showSnack(error?.message || 'Something went wrong.');
    }
  };

  const finalDeleteMember = async () => {
    const token = LoginData?.token;
    const apiPayload = {
      user_id: deleteMember.user_id,
      group_id: deleteMember.group_id,
    };
    try {
      const result = await dispatch(
        DeleteGroupMemberApi({ payload: apiPayload, token }),
      ).unwrap();
      if (result?.status === true || result?.status === 'true') {
        showSnack(result?.message);
        setAlertVisible(false);
        dispatch(GetGroupMembersApi(LoginData.token));

        // If I removed myself, go back
        if (deleteMember.user_id === LoginData?.user?.id) {
          navigation.goBack();
          dispatch(GetGroupsApi(LoginData.token));
        } else {
          dispatch(
            GetGroupExpenseApi({ token: LoginData.token, id: group.id }),
          );
          dispatch(GetGroupsApi(LoginData.token));
        }
      } else {
        showSnack(result?.message || 'Failed.');
        dispatch(GetGroupExpenseApi({ token: LoginData.token, id: group.id }));
      }
    } catch (error) {
      showSnack(error?.message || 'Something went wrong.');
    }
  };

  const availableFriendsToAdd = useMemo(() => {
    const memberUserIds = new Set(groupMembers.map(member => member.user_id));

    let list = friendList.filter(friend => !memberUserIds.has(friend.id));

    // if (LoginData?.user?.id && !memberUserIds.has(LoginData.user.id)) {
    //   const currentUserObj = {
    //     id: LoginData.user.id,
    //     fullname: `${LoginData.user.fullname} (You)`, // Adding (You) for clarity
    //     email: LoginData.user.email,
    //     mobile: LoginData.user.mobile,
    //     profile_photo: LoginData.user.profile_photo,
    //   };
    //   list = [currentUserObj, ...list];
    // }

    return list;
  }, [friendList, groupMembers, LoginData]);
  

  const showSnack = message => setSnack({ visible: true, message });
  const handleBack = () =>
    navigation.canGoBack()
      ? navigation.goBack()
      : navigation.navigate('settle');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {group?.group_name || 'Group Details'}
        </Text>
      </View>
      {!isStillMember && !GetGroupMembersLoading ? (
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.centeredMessageText}>
          You are no longer a member of this group.
        </Text>
        <TouchableOpacity onPress={handleBack} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        style={styles.scrollContainer}
      >
        {/* Budget Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroLabel}>Remaining Budget</Text>
              <Text style={styles.heroValue}>
                ₹{remaining?.toLocaleString()}
              </Text>
            </View>
            <View style={styles.circularIcon}>
              <TrendingUp size={24} color={colors.text} />
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>
                Spent: ₹{totalSpent?.toLocaleString()}
              </Text>
              <Text style={styles.progressText}>{percentage?.toFixed(0)}%</Text>
            </View>
            <ProgressBar
              progress={percentage / 100}
              color={colors.theme}
              style={styles.progressBar}
            />
            <Text style={styles.totalBudgetLabel}>
              Total Budget: ₹
              {parseFloat(group?.group_budget || 0).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.groupTitleContainer}>
          <Text style={styles.groupTitle}>Group Description</Text>

          <TouchableOpacity
              onPress={fetchGroupData}
              style={styles.headerIconBtn}
            >
              <History size={20} color={colors.white} />
            </TouchableOpacity>
            </View>
          
          {group?.description && (
            <Text style={styles.description}>{group.description}</Text>
          )}
        </View>

        {/* Settlements */}
        {settlements.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Settlements</Text>
            <View style={styles.settlementCard}>
              {settlements.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.settlementRow,
                    index === settlements.length - 1 && {
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <View style={styles.settlementAvatars}>
                    <Avatar.Text
                      size={32}
                      label={item.from.substring(0, 1)}
                      style={[
                        styles.avatar,
                        { marginRight: 5, backgroundColor: colors.background },
                      ]}
                      labelStyle={{ color: colors.error }}
                    />
                    <ArrowRightLeft size={16} color={colors.textSecondary} />
                    <Avatar.Text
                      size={32}
                      label={item.to.substring(0, 1)}
                      style={[
                        styles.avatar,
                        { marginLeft: 5, backgroundColor: colors.background },
                      ]}
                      labelStyle={{ color: colors.success }}
                    />
                  </View>
                  <Text style={styles.settlementText}>
                    <Text style={styles.settlementHighlight}>{item.from}</Text>{' '}
                    pays{' '}
                    <Text style={styles.settlementHighlight}>{item.to}</Text>
                  </Text>
                  <Text style={styles.settlementAmount}>
                    ₹{item.amount.toFixed(0)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Members List */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Members ({groupMembers.length})
            </Text>

            {/* Show Add Button ONLY if Current User is Admin */}
            {isCurrentUserAdmin && (
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.smallBtn}
              >
                <UserPlus size={16} color={colors.theme} />
                <Text style={styles.smallBtnText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.listContainer}>
            {groupMembers.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No members added yet.</Text>
              </View>
            ) : (
              groupMembers.map((member, index) => {
                const balance = memberStats?.balances[member.user_id] || 0;
                const spent = memberStats?.personalSpent[member.user_id] || 0;
                const isPositive = balance >= 0;
                const isMe = member.user_id === LoginData?.user?.id;

                // --- VISIBILITY LOGIC ---
                // 1. If I am Admin: I can delete everyone (including myself -> Leave).
                // 2. If I am Member: I can only delete myself (Leave).
                const showDeleteAction = isCurrentUserAdmin || isMe;

                return (
                  <View key={member.id}>
                    <View style={styles.memberRow}>
                      {member?.user?.profile_photo ? (
                        <Image
                          source={{ uri: Img_url + member.user?.profile_photo }}
                          style={styles.memberAvatar}
                          resizeMode="cover"
                        />
                      ) : (
                        <Avatar.Text
                          size={40}
                          label={(member.user?.fullname || 'NA')
                            .substring(0, 2)
                            .toUpperCase()}
                          style={styles.avatar}
                          labelStyle={styles.avatarLabel}
                        />
                      )}

                      <View style={{ marginLeft: 12, flex: 1 }}>
                        <View style={styles.memberNameRow}>
                          <Text style={styles.memberName}>
                            {member.user?.fullname || 'Unknown'}{' '}
                            {isMe && '(You)'}
                          </Text>

                          {/* Trash/Leave Icon */}
                          {showDeleteAction && (
                            <TouchableOpacity
                              onPress={() => handleDeleteMember(member)}
                            >
                              {isMe  ? (
                                <LogOut size={18} color={colors.error} /> 
                              ) : (
                                <Trash2 size={18} color={colors.error} /> 
                              )}
                            </TouchableOpacity>
                          )}
                        </View>

                        <View style={styles.memberStatsRow}>
                            <Text
                              style={
                                member?.role === 'admin'
                                  ? styles.adminText
                                  : styles.roleText
                              }
                            >
                              {member.role?.charAt(0).toUpperCase() +
                                member.role?.slice(1)}
                            </Text>
                          {Math.abs(balance) > 0.5 && (
                            <Text
                              style={[
                                styles.balanceText,
                                {
                                  color: isPositive
                                    ? colors.success
                                    : colors.error,
                                },
                              ]}
                            >
                              {isPositive ? 'Gets back' : 'Owes'} ₹
                              {Math.abs(balance).toFixed(0)}
                            </Text>
                          )}
                          <Text style={styles.spentText}>
                            Spent: ₹{spent.toFixed(0)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {index < groupMembers.length - 1 && (
                      <Divider style={styles.divider} />
                    )}
                  </View>
                );
              })
            )}
          </View>
        </View>

        {/* Expenses List */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableOpacity
              onPress={() => setExpenseFormOpen(true)}
              style={styles.addButton}
            >
              <Plus size={20} color={colors.text} />
              <Text style={styles.addButtonText}>Add Group Expense</Text>
            </TouchableOpacity>
          </View>
          {groupExpenses.length === 0 ? (
            <View style={styles.listContainer}>
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No expenses recorded yet.</Text>
              </View>
            </View>
          ) : (
            groupExpenses.map(expense => {
              const payer = groupMembers.find(
                m => m.user_id === expense.paid_by_user_id,
              );
              const paidByName =
                payer?.user_id === LoginData?.user?.id
                  ? 'You'
                  : payer?.user?.fullname || 'Unknown';
              return (
                <TouchableOpacity
                  key={expense.id}
                  onPress={() => handleViewExpense(expense)}
                  activeOpacity={0.7}
                >
                  <View style={styles.expenseCard}>
                    <View style={styles.row}>
                      <View style={styles.expenseIconBox}>
                        <IndianRupee size={20} color={colors.theme} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.expenseTitle}>
                          {expense.description}
                        </Text>
                        <Text style={styles.expenseSub}>
                          Paid by{' '}
                          <Text style={{ color: colors.text }}>
                            {paidByName}
                          </Text>{' '}
                          • {expense.date}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.expenseAmount}>
                          ₹{parseFloat(expense.amount).toLocaleString()}
                        </Text>
                        <Text style={styles.splitText}>
                          for {expense.splitexpense.length}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
        {isCurrentUserAdmin && (
          <View style={{ padding: 16, marginTop: 10 }}>
            <TouchableOpacity
              onPress={handleDeleteGroupPrompt}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fee2e2',
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.error,
              }}
            >
              <Trash2 size={20} color={colors.error} />
              <Text
                style={{
                  color: colors.error,
                  marginLeft: 8,
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                Delete Group
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    )}
      {/* Modals & Alerts */}
      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        showCancel={true}
        cancelText="Cancel"
        confirmText={alertConfig.btnText}
        onCancel={() => setAlertVisible(false)}
        onConfirm={
          actionType === 'group' ? finalDeleteGroup : finalDeleteMember
        }
      />

      <AddGroupMemberModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddMember}
        friends={availableFriendsToAdd}
      />

      <AddGroupExpenseModal
        visible={expenseFormOpen}
        onClose={() => setExpenseFormOpen(false)}
        onSubmit={handleSaveExpense}
        groupMembers={groupMembers}
        currentUser={currentUserMemberObj}
      />

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

      {loading && <DashedLoader color={colors.primary} size={100} />}
    </View>
  );
};

export default GroupDetails;
