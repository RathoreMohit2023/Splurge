import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  Share,
} from 'react-native';
import { Text, Avatar, Snackbar, ProgressBar } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Copy,
  Users,
  TrendingUp,
  TrendingDown,
  UserPlus2,
  ArrowUpRight,
  History,
  Bell,
  CheckCircle,
  User,
  Plus,
} from 'lucide-react-native';
import AddPaymentLogModal from '../../Modals/AddPaymentLogModal';
import CreateGroupModal from '../../Modals/CreateGroupModal';
import SettleUpModal from '../../Modals/SettleUpModal';
import getGroupSettleStyle from '../../styles/MainScreen/groupSettleStyle';
import { ThemeContext } from '../../components/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AddFriendApi } from '../../Redux/Api/AddFriendApi';
import { GetFriendsApi } from '../../Redux/Api/GetFriendsApi';
import { AddGroupApi } from '../../Redux/Api/AddGroupApi';
import { GetGroupsApi } from '../../Redux/Api/GetGroupsAPi';
import { GetGroupMembersApi } from '../../Redux/Api/GetGroupMemberApi';
import { GetGroupExpenseApi } from '../../Redux/Api/GetGroupExpenseApi';
import { AddPaymentLogApi } from '../../Redux/Api/AddPaymentLogApi';
import { GetPaymentLogApi } from '../../Redux/Api/GetPaymentLogApi';
import { Img_url } from '../../Redux/NWConfig';
import { SettleUpApi } from '../../Redux/Api/SettleUpApi';
import { RemainderApi } from '../../Redux/Api/RemainderApi';
import { AddGroupMemberApi } from '../../Redux/Api/AddGroupMemberApi';

const GroupSettle = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getGroupSettleStyle(colors), [colors]);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { LoginData } = useSelector(state => state.Login);
  const { GetFriendsData } = useSelector(state => state.GetFriends || {});
  const { GetGroupsData } = useSelector(state => state.GetGroups || {});
  const { GetGroupExpenseData } = useSelector(
    state => state.GetGroupExpense || {},
  );
  const { GetGroupMembersData } = useSelector(
    state => state.GetGroupMembers || {},
  );

  const { GetPaymentLogData } = useSelector(state => state.GetPaymentLog || {});
  const { DeleteGroupExpenseLoading } = useSelector(
    state => state.DeleteGroupExpense || {},
  );

  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [groupFormOpen, setGroupFormOpen] = useState(false);
  const [settleModalOpen, setSettleModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendCode, setFriendCode] = useState('');
  const [snack, setSnack] = useState({ visible: false, message: '' });

  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  const [groupMemberCounts, setGroupMemberCounts] = useState({});
  const [myGroupIds, setMyGroupIds] = useState([]);
  const [groupExpenses, setGroupExpenses] = useState([]);

  const userCode = LoginData?.user?.code;
  const userId = LoginData?.user?.id;
  const shareableLink = 'https://splurge.app/invite/2K4X9';

  const showSnack = message => setSnack({ visible: true, message });

  const fetchInitialData = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      dispatch(
        GetFriendsApi({ token: LoginData.token, id: LoginData.user.id }),
      );
      dispatch(GetGroupsApi(LoginData.token));
      dispatch(GetGroupMembersApi(LoginData.token));
      dispatch(GetPaymentLogApi(LoginData.token));
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // --- 1. Friend List Calculation Logic (Bi-Directional) ---
  useEffect(() => {
    const rawFriends = GetFriendsData?.friends || [];
    const logs =
      GetPaymentLogData?.payment_logs?.filter(
        log => log.status !== 'settled',
      ) || [];

    if (rawFriends.length > 0) {
      const balanceMap = {};

      logs.forEach(log => {
        const amount = parseFloat(log.amount) || 0;

        // CASE 1: Log created BY ME (user_id == me)
        if (String(log.user_id) === String(userId)) {
          const friendId = log.friend_id;
          if (!balanceMap[friendId]) balanceMap[friendId] = 0;

          if (log.type === 'They owe') {
            balanceMap[friendId] += amount; // I get money (+)
          } else if (log.type === 'I owe') {
            balanceMap[friendId] -= amount; // I pay money (-)
          }
        }
        // CASE 2: Log created BY FRIEND involving ME (friend_id == me)
        else if (String(log.friend_id) === String(userId)) {
          const creatorId = log.user_id; // Here, the creator is the friend
          if (!balanceMap[creatorId]) balanceMap[creatorId] = 0;

          // Logic Inversion (Kyuki friend ne apne perspective se likha h)
          if (log.type === 'They owe') {
            // Friend says "They (Me) owe". Means I owe Friend.
            balanceMap[creatorId] -= amount; // I pay money (-)
          } else if (log.type === 'I owe') {
            // Friend says "I (Friend) owe". Means Friend owes Me.
            balanceMap[creatorId] += amount; // I get money (+)
          }
        }
      });

      const calculatedFriends = rawFriends.map(friend => {
        const netBalance = balanceMap[friend.id] || 0;
        return {
          ...friend,
          owes: netBalance > 0 ? netBalance : 0, // Friend owes me
          owed: netBalance < 0 ? Math.abs(netBalance) : 0, // I owe friend
        };
      });

      setFriends(calculatedFriends);
    }
  }, [GetFriendsData, GetPaymentLogData, userId]);

  const recentActivityLogs = useMemo(() => {
    if (!GetPaymentLogData?.payment_logs || !userId) return [];

    const relevantLogs = GetPaymentLogData?.payment_logs.filter(
      log =>
        (String(log.user_id) === String(userId) ||
          String(log.friend_id) === String(userId)) &&
        log.status !== 'settled',
    );

    const mappedLogs = relevantLogs.map(log => {
      let friendName = 'Unknown';
      let isIncoming = false;

      if (String(log.user_id) === String(userId)) {
        const friend = friends.find(
          f => String(f.id) === String(log.friend_id),
        );
        friendName = friend ? friend.fullname : 'Unknown User';
        isIncoming = log.type === 'They owe';
      } else {
        const friend = friends.find(f => String(f.id) === String(log.user_id));
        friendName = friend ? friend.fullname : 'Unknown User';
        isIncoming = log.type === 'I owe';
      }

      return {
        id: log.id,
        friendName: friendName,
        amount: parseFloat(log.amount).toFixed(2),
        description: log.description,
        date: log.date,
        created_at: log.created_at,
        isIncoming: isIncoming,
        createdByMe: String(log.user_id) === String(userId),
        friendId: log.friend_id,
        userId: log.user_id,
      };
    });

    return mappedLogs.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  }, [GetPaymentLogData, userId, friends]);

  useEffect(() => {
    if (GetGroupsData?.group_list) {
      setGroups(GetGroupsData.group_list);
    }
  }, [GetGroupsData]);

  useEffect(() => {
    if (GetGroupMembersData?.members) {
      const membersList = GetGroupMembersData.members;

      const newCounts = {};
      const foundMyGroupIds = [];

      membersList.forEach(member => {
        const gId = member.group_id;

        if (newCounts[gId]) {
          newCounts[gId] += 1;
        } else {
          newCounts[gId] = 1;
        }

        if (String(member.user_id) === String(userId)) {
          if (!foundMyGroupIds.includes(gId)) {
            foundMyGroupIds.push(gId);
          }
        }
      });

      setGroupMemberCounts(newCounts);
      setMyGroupIds(foundMyGroupIds);
    }
  }, [GetGroupMembersData, userId]);

  useEffect(() => {
    if (groups.length > 0 && LoginData?.token) {
      const fetchExpenses = async () => {
        const expensePromises = groups.map(g =>
          dispatch(
            GetGroupExpenseApi({ token: LoginData.token, id: g.id }),
          ).unwrap(),
        );

        try {
          const expenseResults = await Promise.all(expensePromises);
          let allExpenses = [];
          expenseResults.forEach(result => {
            if (result?.group && Array.isArray(result.group)) {
              allExpenses = [...allExpenses, ...result.group];
            }
          });
          setGroupExpenses(allExpenses);
        } catch (error) {
          // console.log('Expense fetch error', error);
        }
      };
      fetchExpenses();
    }
  }, [groups, LoginData?.token, dispatch, DeleteGroupExpenseLoading]);

  useEffect(() => {
    if (GetGroupExpenseData?.group) {
      setGroupExpenses(prev => [...prev, ...GetGroupExpenseData.group]);
    }
  }, [GetGroupExpenseData]);

  const groupSpentMap = useMemo(() => {
    const map = {};
    if (groupExpenses && groupExpenses.length > 0) {
      const uniqueExpenses = [
        ...new Map(groupExpenses.map(item => [item['id'], item])).values(),
      ];

      uniqueExpenses.forEach(expense => {
        const gId = expense.group_id;
        const amount = parseFloat(expense.amount) || 0;

        if (map[gId]) {
          map[gId] += amount;
        } else {
          map[gId] = amount;
        }
      });
    }
    return map;
  }, [groupExpenses]);

  const handleCopyCode = () => {
    Clipboard.setString(userCode);
    showSnack('Your Splurge ID copied!');
  };

  const handleShareLink = async () => {
    try {
      await Share.share({
        title: 'Join Splurge',
        message: `Join Splurge with my code: ${userCode}`,
      });
    } catch (error) {
      // console.log("Sharing Error:", error);
    }
  };

  const handleAddFriend = async () => {
    if (!friendCode.trim()) {
      showSnack('Please enter a valid friend code');
      return;
    }
    if (friendCode.trim() === userCode) {
      showSnack('You cannot add yourself as a friend');
      return;
    }
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('friend_code', friendCode);
    try {
      const result = await dispatch(AddFriendApi({ formData, token })).unwrap();
      if (result?.status === true) {
        showSnack(result?.message);
        setFriendCode('');
        dispatch(
          GetFriendsApi({ token: LoginData.token, id: LoginData.user.id }),
        );
      } else {
        showSnack(result?.message);
        dispatch(
          GetFriendsApi({ token: LoginData.token, id: LoginData.user.id }),
        );
      }
    } catch (error) {
      showSnack('Something went wrong. Please try again.');
    }
  };

  const handleAddPaymentLog = async data => {
    if (!LoginData?.user?.id) {
      showSnack('User information missing. Please login again.');
      return;
    }
    try {
      const dateObj = new Date(data.date);
      const formattedDate = dateObj.toISOString().split('T')[0];
      let apiType = '';
      if (data.type.value === 'i_owe_them') {
        apiType = 'I owe';
      } else {
        apiType = 'They owe';
      }

      const formData = new FormData();
      formData.append('user_id', LoginData.user.id);
      formData.append('friend_id', data.friend.value);
      formData.append('type', apiType);
      formData.append('amount', data.amount);
      formData.append('date', formattedDate);
      formData.append('description', data.description);

      const result = await dispatch(
        AddPaymentLogApi({ formData, token: LoginData.token }),
      ).unwrap();

      if (result.status === true) {
        showSnack('Payment log added successfully!');
        setPaymentFormOpen(false);
        fetchInitialData();
      } else {
        showSnack(result.message || 'Failed to add log');
        fetchInitialData();
      }
    } catch (error) {
      console.error('Error creating payment log:', error);
      showSnack('Something went wrong');
    }
  };

  const handleViewGroup = group => {
    navigation.navigate('groupDetails', { group: group });
  };

  const handleCreateGroup = async data => {
    if (!data?.groupName || !data?.budget) {
      showSnack('Please provide group name and budget');
      return;
    }
  
    const token = LoginData?.token;
    const userId = LoginData?.user?.id;
  
    if (!token || !userId) return;
  
    const finalMembersPayload = [
      {
        user_id: userId,
        role: 'admin',
      },
    ];
  
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('group_name', data.groupName);
    formData.append('group_budget', data.budget);
    formData.append('description', data.description || '');
  
    try {
      // ✅ 1️⃣ Create Group
      const createGroupRes = await dispatch(
        AddGroupApi({ formData, token })
      ).unwrap();
  
      if (!createGroupRes?.status) {
        showSnack(createGroupRes?.message);
        return;
      }
  
      const groupId = createGroupRes?.group?.id;
  
      // ✅ 2️⃣ Add Admin as Member
      const addMemberRes = await dispatch(
        AddGroupMemberApi({
          payload: {
            group_id: groupId,
            members: finalMembersPayload,
          },
          token,
        })
      ).unwrap();
  
      if (addMemberRes?.status) {
        dispatch(GetGroupMembersApi(token));
      }
  
      // ✅ 3️⃣ Fetch group expense using correct groupId
      dispatch(
        GetGroupExpenseApi({
          token,
          id: groupId,
        })
      );
  
      showSnack(createGroupRes?.message);
      fetchInitialData();
      setGroupFormOpen(false);
  
    } catch (error) {
      console.log('Create group error:', error);
      showSnack('Something went wrong. Please try again.');
    }
  };
  
  const handleRemind = async friend => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('sender_id', LoginData?.user?.id);
    formData.append('receiver_id', friend.id);
    formData.append('settled_amount', friend.owes);

    try {
      const result = await dispatch(RemainderApi({ formData, token })).unwrap();
      if (result?.status === true) {
        showSnack(result?.message);
      } else {
        showSnack(result?.message);
        fetchInitialData();
      }
    } catch (error) {
      showSnack('Something went wrong. Please try again.');
    }
  };

  const handleOpenSettle = friend => {
    setSelectedFriend(friend);
    setSettleModalOpen(true);
  };

  const handleSettleUpSave = async data => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('sender_id', LoginData?.user?.id);
    formData.append('receiver_id', selectedFriend.id);
    formData.append('settled_amount', data.amount);

    try {
      const result = await dispatch(SettleUpApi({ formData, token })).unwrap();
      if (result?.status === true) {
        showSnack(result?.message);
        fetchInitialData();
        setGroupFormOpen(false);
      } else {
        showSnack(result?.message);
        fetchInitialData();
      }
    } catch (error) {
      showSnack('Something went wrong. Please try again.');
    }
  };

  const isUserAdminInAnyGroup = groups?.some(
    g => String(g.group_admin) === String(userId)
  );
  const isUserMemberInAnyGroup = GetGroupMembersData?.members?.some(
    m => String(m.user_id) === String(userId)
  );
  const showNoGroups =
  !isUserAdminInAnyGroup && !isUserMemberInAnyGroup;


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 90,
          paddingTop: 20,
        }}
      >
        <View style={styles.inner}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Group Settle</Text>
              <Text style={styles.subtitle}>Split bills, not friendships.</Text>
            </View>
            <TouchableOpacity
              onPress={fetchInitialData}
              style={styles.headerIconBtn}
            >
              <History size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <Text style={styles.heroLabel}>Your Splurge ID</Text>
              <TouchableOpacity
                onPress={handleShareLink}
                style={styles.shareBadge}
              >
                <Text style={styles.shareText}>Share Code</Text>
                <ArrowUpRight size={14} color={colors.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{userCode}</Text>
              <TouchableOpacity onPress={handleCopyCode} style={styles.copyBtn}>
                <Copy size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}>
                <UserPlus2 size={22} color={colors.theme} />
              </View>
              <TextInput
                placeholder="Enter friend code (e.g., SPL-12345)"
                placeholderTextColor={colors.textDisabled}
                value={friendCode}
                onChangeText={setFriendCode}
                style={styles.textInput}
                autoCapitalize="characters"
              />
              <TouchableOpacity onPress={handleAddFriend} style={styles.addBtn}>
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Friends</Text>
              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => setPaymentFormOpen(true)}
              >
                <Plus size={20} color={colors.theme} />
                <Text style={styles.linkText}> Add Payment Log</Text>
              </TouchableOpacity>
            </View>
            {friends?.length === 0 && (
              <View style={styles.groupCard}>
                <Text style={styles.progressLabel}>No friends found.</Text>
              </View>
            )}
            {friends?.map(friend => (
              <View
                key={friend.id}
                style={[styles.friendCard, { paddingBottom: 12 }]}
              >
                <View style={styles.row}>
                  {friend?.profile_photo ? (
                    <Image
                      source={{ uri: Img_url + friend?.profile_photo }}
                      style={styles.memberAvatar}
                      resizeMode="cover"
                    />
                  ) : (
                    <Avatar.Text
                      size={48}
                      label={(friend.fullname || 'NA')
                        .substring(0, 2)
                        .toUpperCase()}
                      style={styles.avatar}
                      labelStyle={styles.avatarLabel}
                    />
                  )}
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{friend.fullname}</Text>
                    {friend.owed === 0 && friend.owes === 0 ? (
                      <Text style={styles.settledText}>No Log Found</Text>
                    ) : (
                      <View style={styles.statusRow}>
                        {friend.owes > 0 && (
                          <Text
                            style={[
                              styles.statusText,
                              { color: colors.success },
                            ]}
                          >
                            Owes you ₹{friend.owes.toFixed(2)}
                          </Text>
                        )}
                        {friend.owed > 0 && (
                          <Text
                            style={[styles.statusText, { color: colors.error }]}
                          >
                            You owe ₹{friend.owed.toFixed(2)}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                  <View style={styles.actionIcon}>
                    {friend.owes > 0 ? (
                      <TrendingUp size={20} color={colors.success} />
                    ) : friend.owed > 0 ? (
                      <TrendingDown size={20} color={colors.error} />
                    ) : (
                      <User size={20} color={colors.theme} />
                    )}
                  </View>
                </View>
                {(friend.owes > 0 || friend.owed > 0) && (
                  <View style={styles.friendCardActions}>
                    {friend.owes > 0 && (
                      <TouchableOpacity
                        onPress={() => handleRemind(friend)}
                        style={styles.remindButton}
                      >
                        <Bell
                          size={16}
                          color={colors.theme}
                          style={{ marginRight: 6 }}
                        />
                        <Text style={styles.remindButtonText}>Remind</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => handleOpenSettle(friend)}
                      style={styles.settleButton}
                    >
                      <CheckCircle
                        size={16}
                        color={colors.theme}
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.settleButtonText}>Settle Up</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Groups</Text>
              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => setGroupFormOpen(true)}
              >
                <Plus size={20} color={colors.theme} />
                <Text style={styles.linkText}>Create New</Text>
              </TouchableOpacity>
            </View>
            {showNoGroups && (
  <View style={styles.groupCard}>
    <Text style={styles.progressLabel}>No groups found.</Text>
  </View>
)}



            {groups?.map(group => {
              const isAdmin = String(group.group_admin) === String(userId);
              const isMember = myGroupIds.includes(group.id);

              if (!isAdmin && !isMember) {
                return null;
              }

              const budget = parseFloat(group.group_budget) || 0;
              const totalSpent = groupSpentMap[group.id] || 0;
              const percentage =
                budget > 0 ? Math.min(100, (totalSpent / budget) * 100) : 0;
              const remaining = budget - totalSpent;
              const isOverBudget = remaining < 0;

              let progressColor = colors.success;
              if (percentage > 50) progressColor = colors.warning;
              if (percentage > 85) progressColor = colors.error;

              return (
                <TouchableOpacity
                  key={group.id}
                  activeOpacity={0.7}
                  onPress={() => handleViewGroup(group)}
                >
                  <View style={styles.groupCard}>
                    <View style={styles.rowBetween}>
                      <View style={styles.row}>
                        <View
                          style={[
                            styles.groupIconBg,
                            { backgroundColor: colors.theme },
                          ]}
                        >
                          <Users size={18} color={colors.white} />
                        </View>
                        <View>
                          <Text style={styles.groupName}>
                            {group.group_name}
                          </Text>
                          <Text style={styles.groupMembers}>
                            {groupMemberCounts[group.id] || 0} members
                          </Text>
                        </View>
                      </View>

                      <View style={{ alignItems: 'flex-end' }}>
                        <Text
                          style={[
                            styles.amountText,
                            {
                              color: isOverBudget ? colors.error : colors.text,
                            },
                          ]}
                        >
                          ₹{Math.abs(remaining).toLocaleString()}
                        </Text>
                        <Text
                          style={{ fontSize: 10, color: colors.textSecondary }}
                        >
                          {isOverBudget ? 'Over Budget' : 'Remaining'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.progressContainer}>
                      <View style={styles.rowBetween}>
                        <Text
                          style={[
                            styles.progressLabel,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Spent: ₹{totalSpent.toLocaleString()}
                        </Text>
                        <Text
                          style={[
                            styles.progressLabel,
                            { fontWeight: 'bold', color: progressColor },
                          ]}
                        >
                          {percentage.toFixed(0)}%
                        </Text>
                      </View>
                      <ProgressBar
                        progress={percentage / 100}
                        color={progressColor}
                        style={[
                          styles.progressBar,
                          {
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: colors.border,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View
              style={[
                styles.logContainer,
                recentActivityLogs.length > 5 && { height: 500 },
              ]}
            >
              <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              >
                {recentActivityLogs.length === 0 ? (
                  <View style={styles.noRecentContainer}>
                    <Text style={styles.progressLabel}>
                      No recent activity found.
                    </Text>
                  </View>
                ) : (
                  recentActivityLogs?.map(log => (
                    <View key={log.id} style={styles.logCard}>
                      <View style={styles.row}>
                        <View
                          style={[
                            styles.logIcon,
                            {
                              backgroundColor: log.isIncoming
                                ? colors.success
                                : colors.error,
                            },
                          ]}
                        >
                          {log.isIncoming ? (
                            <TrendingUp size={16} color={colors.white} />
                          ) : (
                            <TrendingDown size={16} color={colors.white} />
                          )}
                        </View>
                        <View style={styles.logContent}>
                          <Text style={styles.logTitle}>
                            {log.isIncoming
                              ? `${log.friendName} owes you`
                              : `You owe ${log.friendName}`}
                          </Text>
                          <Text style={styles.logDesc}>
                            {log.description}
                            {!log.createdByMe && (
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: colors.textSecondary,
                                }}
                              >
                                {' '}
                                (Added by them)
                              </Text>
                            )}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              color: colors.textSecondary,
                            }}
                          >
                            {log.date}
                          </Text>
                        </View>
                        <View style={styles.logAmount}>
                          <Text
                            style={[
                              styles.logAmountText,
                              {
                                color: log.isIncoming
                                  ? colors.success
                                  : colors.error,
                              },
                            ]}
                          >
                            {log.isIncoming ? '+' : '-'}₹{log.amount}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>

      <AddPaymentLogModal
        visible={paymentFormOpen}
        onClose={() => setPaymentFormOpen(false)}
        friends={friends}
        onSave={data => {
          handleAddPaymentLog(data);
        }}
      />
      <CreateGroupModal
        visible={groupFormOpen}
        onClose={() => setGroupFormOpen(false)}
        onSubmit={handleCreateGroup}
      />
      <SettleUpModal
        visible={settleModalOpen}
        onClose={() => setSettleModalOpen(false)}
        friend={selectedFriend}
        onSave={handleSettleUpSave}
      />
      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: '' })}
        duration={2000}
        style={{
          backgroundColor: colors.card,
          marginBottom: insets.bottom + 80,
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

export default GroupSettle;
