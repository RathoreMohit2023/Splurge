import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Plus, Car, Coffee, Film, Utensils, ShoppingBag, Home, Lightbulb,
  Signal, Fuel, Wrench, Stethoscope, School, GraduationCap, Shirt,
  Plane, Repeat, Shield, Landmark, TrendingUp, ShoppingCart, Scissors,
  Gift, AlertTriangle, Baby, Dog, DollarSign,
  Trash2,
  Pencil,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';

import AddTransactionModal from '../../../Modals/AddTransactionModal';
import EditTransactionModal from '../../../Modals/EditTransectionModal';
import getLedgerStyles from '../../../styles/MainScreen/tabs/LedgerStyle';
import { ThemeContext } from '../../../components/ThemeContext';
import { AddTransactionApi } from '../../../Redux/Api/AddTransactionApi';
import ToastMessage from '../../../components/ToastMessage';
import CustomAlert from '../../../components/CustomAlert';
import { GetTransectionApi } from '../../../Redux/Api/GetTransectionApi';
import { EditTransectionApi } from '../../../Redux/Api/EditTransectionApi';
import { DeleteTransactionApi } from '../../../Redux/Api/DeleteTransectionApi';

const categoryIcons = {
  'Food & Groceries': Utensils,
  'Dining Out': Coffee,
  'Rent / Housing': Home,
  'Utilities': Lightbulb,
  'Internet & Mobile Recharge': Signal,
  'Transportation': Car,
  'Fuel': Fuel,
  'Vehicle Maintenance': Wrench,
  'Health & Medical': Stethoscope,
  'Medicine / Pharmacy': Stethoscope,
  'Education': School,
  'School Fees': GraduationCap,
  'Shopping': ShoppingBag,
  'Clothing': Shirt,
  'Entertainment': Film,
  'Travel & Trips': Plane,
  'Subscriptions': Repeat,
  'Insurance': Shield,
  'Loans & EMIs': Landmark,
  'Investments & Savings': TrendingUp,
  'Household Supplies': ShoppingCart,
  'Personal Care': Scissors,
  'Gifts & Donations': Gift,
  'Emergency Expenses': AlertTriangle,
  'Kids & Childcare': Baby,
  'Pets & Pet Care': Dog,
};

const LedgerTab = () => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getLedgerStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { LoginData } = useSelector(state => state.Login);
  const { GetTransactionData, GetTransactionLoading } = useSelector(state => state.GetTransaction);
  const { AddTransactionLoading } = useSelector(state => state.AddTransaction);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchTransactions = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      dispatch(GetTransectionApi({ token: LoginData.token, id: LoginData.user.id }));
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [LoginData]);

  const allTransactions = GetTransactionData?.get_transactions || [];

  // --- FILTER FOR CURRENT MONTH TRANSACTIONS ---
  const { currentMonthTransactions, currentMonthTotal } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const filteredTransactions = allTransactions.filter(t => {
        if (!t.date) return false;
        const txnDate = new Date(t.date);
        return txnDate.getFullYear() === currentYear && txnDate.getMonth() === currentMonth;
    });

    const total = filteredTransactions.reduce(
        (sum, t) => sum + parseFloat(t.amount || 0),
        0,
    );

    // Sort transactions by date, newest first
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { currentMonthTransactions: filteredTransactions, currentMonthTotal: total };
  }, [allTransactions]);


  const handleAddTransaction = async (newTxn) => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('category', newTxn.category);
    formData.append('amount', newTxn.amount);
    formData.append('description', newTxn.description);
    formData.append('date', newTxn.date);

    try {
      const result = await dispatch(AddTransactionApi({ formData, token })).unwrap();
      if (result?.status) {
        setToastMsg(result.message || 'Transaction added successfully!');
        setModalVisible(false);
        fetchTransactions();
      } else {
        setToastMsg(result.message || 'Failed to add transaction.');
      }
    } catch (error) {
      setToastMsg('Something went wrong. Please try again.');
    } finally {
      setToastVisible(true);
    }
  };

  const handleEditTransaction = async (editedTxn) => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('amount', editedTxn.amount);
    formData.append('category', editedTxn.category);
    formData.append('description', editedTxn.description);
    formData.append('date', editedTxn.date);

    try {
      const result = await dispatch(EditTransectionApi({ formData, token, id: editedTxn.id })).unwrap();
      if (result?.status) {
        setToastMsg(result.message || 'Transaction updated successfully!');
        setEditModalVisible(false);
        setItemToEdit(null);
        fetchTransactions();
      } else {
        setToastMsg(result.message || 'Failed to update transaction.');
      }
    } catch (error) {
      setToastMsg('Something went wrong. Please try again.');
    } finally {
      setToastVisible(true);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const token = LoginData?.token;
    try {
        const result = await dispatch(DeleteTransactionApi({ token, id: itemId })).unwrap();
        if (result?.status) {
            setToastMsg(result.message || "Transaction deleted.");
            fetchTransactions();
        } else {
            setToastMsg(result.message || "Failed to delete transaction.");
            fetchTransactions();
        }
    } catch (error) {
        setToastMsg("Something went wrong. Please try again.");
    } finally {
        setToastVisible(true);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let parts = dateString.split(/[-/]/);
    let transactionDate;
    if (parts[0].length === 4) {
      transactionDate = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      transactionDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }
    
    if (isNaN(transactionDate)) return dateString;

    if (transactionDate.toDateString() === today.toDateString()) return 'Today';
    if (transactionDate.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return transactionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const openEditModal = item => {
    setItemToEdit(item);
    setEditModalVisible(true);
  };

  const confirmDeleteItem = (itemId, itemDescription) => {
    setItemToDelete({ id: itemId, name: itemDescription });
    setIsAlertVisible(true);
  };

  const isLoading = GetTransactionLoading || AddTransactionLoading;

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Spent (This Month)</Text>
          <Text style={styles.summaryValue}>₹{currentMonthTotal.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={currentMonthTransactions}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        renderItem={({ item }) => {
          const IconComponent = categoryIcons[item.category] || DollarSign;
          return (
            <View style={styles.itemCard}>
              <View style={styles.cardTopRow}>
                <View style={styles.leftSection}>
                  <View style={styles.iconBox}>
                    <IconComponent size={20} color={colors.white} />
                  </View>
                  <View style={styles.textInfo}>
                    <Text style={styles.itemTitle} numberOfLines={1}>{item.description}</Text>
                    <Text style={styles.itemSub}>
                      {item.category} • {formatDate(item.date)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.amountText}>
                  ₹{Number(item.amount).toLocaleString()}
                </Text>
              </View>

              <View style={styles.divider} />
              
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => openEditModal(item)}
                  disabled={isLoading}
                >
                  <Pencil size={18} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => confirmDeleteItem(item.id, item.description)}
                  disabled={isLoading}
                >
                  <Trash2 size={18} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={!isLoading && (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No transactions for this month yet.</Text>
                <Text style={styles.emptySubText}>Tap the + button to add your first one.</Text>
            </View>
        )}
      />

      <CustomAlert
        visible={isAlertVisible}
        title="Delete Transaction"
        message={itemToDelete ? `Are you sure you want to delete "${itemToDelete.name}"?` : ""}
        showCancel={true}
        cancelText="Cancel"
        confirmText="Delete"
        onCancel={() => {
          setIsAlertVisible(false);
          setItemToDelete(null);
        }}
        onConfirm={() => {
          if (itemToDelete) {
            handleDeleteItem(itemToDelete.id);
          }
          setIsAlertVisible(false);
          setItemToDelete(null);
        }}
      />

      {itemToEdit && (
        <EditTransactionModal
          visible={editModalVisible}
          onClose={() => {
            setEditModalVisible(false);
            setItemToEdit(null);
          }}
          item={itemToEdit}
          onSave={handleEditTransaction}
        />
      )}

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddTransaction}
      />
     
      <ToastMessage
        visible={toastVisible}
        message={toastMsg}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

export default LedgerTab;