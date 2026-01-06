import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pencil, Trash2, Gift, Plus, Heart } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';

import AddWishListModal from '../../../Modals/AddWishListModal';
import EditWishListModal from '../../../Modals/EditWishListModal';
import ToastMessage from '../../../components/ToastMessage';
import DashedLoader from '../../../components/DashedLoader';
import CustomAlert from '../../../components/CustomAlert'; // CustomAlert import karein

import { ThemeContext } from '../../../components/ThemeContext';
import getWishlistStyles from '../../../styles/MainScreen/tabs/WishlistStyle';
import { GetWishlistApi } from '../../../Redux/Api/GetWishlistApi';
import { AddWishlistApi } from '../../../Redux/Api/AddWishlistApi';
import { EditWishlistApi } from '../../../Redux/Api/EditWishlistApi';
import { DeleteWishlistApi } from '../../../Redux/Api/DeleteWishlistApi';

const WishlistTab = () => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getWishlistStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { LoginData } = useSelector(state => state.Login);
  const { GetWishlistData, GetWishlistLoading } = useSelector(state => state.GetWishlist || {});
  const { AddWishlistLoading } = useSelector(state => state.AddWishlist || {});
  const { EditWishlistLoading } = useSelector(state => state.EditWishlist || {});
  const { DeleteWishlistLoading } = useSelector(state => state.DeleteWishlist || {});

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Custom Alert State
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchWishlist = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      dispatch(GetWishlistApi({ token: LoginData.token, id: LoginData.user.id }));
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [LoginData]);

  const handleAddItem = async (newItem) => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    formData.append('description', newItem.description || '');

    try {
      const result = await dispatch(AddWishlistApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === "true") {
        setToastMsg(result?.message || "Item added successfully!");
        setAddModalVisible(false);
        fetchWishlist();
      } else {
        setToastMsg(result?.message || "Failed to add item.");
      }
    } catch (error) {
      setToastMsg("Something went wrong. Please try again.");
    } finally {
      setToastVisible(true);
    }
  };

  const handleEditItem = async (updatedItem) => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('wishlist_id', updatedItem.id);
    formData.append('name', updatedItem.name);
    formData.append('price', updatedItem.price);
    formData.append('description', updatedItem.description || '');
    
    try {
      const result = await dispatch(EditWishlistApi({ formData, token, id: updatedItem.id })).unwrap();
      if (result?.status === true || result?.status === "true") {
        setToastMsg(result?.message || "Item updated successfully!");
        setEditModalVisible(false);
        setItemToEdit(null);
        fetchWishlist();
      } else {
        setToastMsg(result?.message || "Failed to update item.");
      }
    } catch (error) {
      setToastMsg("Something went wrong. Please try again.");
    } finally {
      setToastVisible(true);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const token = LoginData?.token;
    try {
        const result = await dispatch(DeleteWishlistApi({ token, id: itemId })).unwrap();
        if (result?.status === true || result?.status === "true") {
            setToastMsg(result?.message || "Item deleted.");
            fetchWishlist();
        } else {
            setToastMsg(result?.message || "Failed to delete item.");
            fetchWishlist();
        }
    } catch (error) {
        setToastMsg("Something went wrong. Please try again.");
    } finally {
        setToastVisible(true);
    }
  };

  const openEditModal = item => {
    setItemToEdit(item);
    setEditModalVisible(true);
  };

  const confirmDeleteItem = (itemId, itemName) => {
    setItemToDelete({ id: itemId, name: itemName });
    setIsAlertVisible(true);
  };

  const isLoading = GetWishlistLoading || AddWishlistLoading || EditWishlistLoading || DeleteWishlistLoading;
  const wishlistData = GetWishlistData?.get_wishlists || [];
  const total = wishlistData.reduce(
    (sum, t) => sum + parseFloat(t.price || 0),
    0,
  );

  return (
    <View style={styles.container}>
       <View style={styles.summaryCard}>
              <View>
                <Text style={styles.summaryLabel}>Total Wishlist Amount</Text>
                <Text style={styles.summaryValue}>₹{total.toLocaleString()}</Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setAddModalVisible(true)}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Plus size={24} color="#fff" />
              </TouchableOpacity>
            </View>

      <FlatList
        data={wishlistData}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Heart size={24} color={colors.white} />
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.rowBetween}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>₹{Number(item.price).toLocaleString()}</Text>
                </View>
                <Text style={styles.desc}>{item.description}</Text>
                <View style={styles.divider} />
                <View style={styles.footer}>
                  <Text style={styles.status}>Target</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => openEditModal(item)}
                      disabled={isLoading}
                    >
                      <Pencil size={18} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => confirmDeleteItem(item.id, item.name)}
                      disabled={isLoading}
                    >
                      <Trash2 size={18} color={colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
        )}
        ListEmptyComponent={!isLoading && (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No items in your wishlist yet.</Text>
                <Text style={styles.emptySubText}>Tap the + to create a goal.</Text>
            </View>
        )}
      />

      <AddWishListModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={handleAddItem}
      />
      <EditWishListModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleEditItem}
        itemToEdit={itemToEdit}
      />
      <ToastMessage
        visible={toastVisible}
        message={toastMsg}
        onHide={() => setToastVisible(false)}
      />

      <CustomAlert
        visible={isAlertVisible}
        title="Delete Item"
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
    </View>
  );
};

export default WishlistTab;