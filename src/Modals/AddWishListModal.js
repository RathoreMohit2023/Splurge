import React, { useState, useContext, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { X, RotateCcw } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomInput from "../components/CustomInput";
import getAddWishListModalStyle from "../styles/Modals/AddWishListModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const AddWishListModal = ({ visible, onClose, onSave }) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddWishListModalStyle(colors), [colors]);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!itemName.trim()) newErrors.itemName = "Item Name is required.";
    if (!price.trim()) {
      newErrors.price = "Price is required.";
    } else if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Enter a valid positive price.";
    }
    if (!description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newItem = {
        name: itemName,
        price: parseFloat(price),
        description: description,
      };
      onSave(newItem);
      resetFormAndClose();
    }
  };

  const handleReset = () => {
    setItemName("");
    setPrice("");
    setDescription("");
    setErrors({});
  };

  const resetFormAndClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={resetFormAndClose}
      statusBarTranslucent={true}
    >
      {/* KeyboardAvoidingView top level par hona chahiye */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add to Wishlist</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={handleReset} style={{ marginRight: 15 }}>
                    <RotateCcw size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={resetFormAndClose}>
                    <X size={24} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Scrollable Form Content */}
              <KeyboardAwareScrollView 
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                extraScrollHeight={20}
              >
                <View style={styles.form}>
                  <CustomInput
                    label="Item Name"
                    placeholder="e.g. iPhone 16 Pro"
                    value={itemName}
                    onChangeText={(text) => {
                      setItemName(text);
                      if (errors.itemName) setErrors(prev => ({ ...prev, itemName: null }));
                    }}
                    leftIcon="tag-outline"
                    error={errors.itemName}
                  />
                  
                  <CustomInput
                    label="Price"
                    placeholder="0.00"
                    value={price}
                    onChangeText={(text) => {
                      setPrice(text);
                      if (errors.price) setErrors(prev => ({ ...prev, price: null }));
                    }}
                    keyboardType="numeric"
                    leftIcon="currency-inr"
                    error={errors.price}
                  />
                  
                  <CustomInput
                    label="Description"
                    placeholder="Why do you want this?"
                    value={description}
                    onChangeText={(text) => {
                        setDescription(text)
                        if (errors.description) setErrors(prev => ({ ...prev, description: null }));
                    }}
                    leftIcon="text-short"
                    error={errors.description}
                    multiline={true}
                  />

                  <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Save Item</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddWishListModal;