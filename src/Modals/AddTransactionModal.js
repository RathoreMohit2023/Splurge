import React, { useState, useContext, useMemo } from "react";
import { View, TouchableOpacity, Modal, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import {
  X,
  ShoppingBag,
  ChevronDown,
  Calendar as CalendarIcon,
  Utensils,
  RotateCcw,
} from "lucide-react-native";
import { Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

import CustomInput from "../components/CustomInput";
import SelectionModal from "../components/SelectionModal";
import getAddTransactionModalStyle from "../styles/Modals/AddTransactionModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const AddTransactionModal = ({ visible, onClose, onSave }) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddTransactionModalStyle(colors), [colors]);
  const { GetCategoriesData } = useSelector((state) => state.GetCategories);

  const categoryList = useMemo(() => {
    if (GetCategoriesData?.data && Array.isArray(GetCategoriesData.data)) {
      return GetCategoriesData.data.map((item) => item.category_name);
    }
    return [];
  }, [GetCategoriesData]);

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!desc.trim()) newErrors.desc = "Description is required.";
    if (!amount.trim()) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Enter a valid amount.";
    }
    if (!category) newErrors.category = "Select a category.";
    if (!date) newErrors.date = "Select a date.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newTxn = {
        id: Date.now().toString(),
        description: desc,
        amount: parseFloat(amount),
        category: category,
        date: date,
        icon: Utensils,
      };
      onSave(newTxn);
      resetFormAndClose();
    }
  };

  const resetFormAndClose = () => {
    setDesc("");
    setAmount("");
    setCategory("");
    setDate("");
    setErrors({});
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={resetFormAndClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Transaction</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { setDesc(""); setAmount(""); setCategory(""); setDate(""); setErrors({}); }} style={{ marginRight: 15 }}>
                <RotateCcw size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={resetFormAndClose}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Content - Scrollable if keyboard covers it */}
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.form}>
              
              {/* Category Selector */}
              <TouchableOpacity
                onPress={() => setCategoryModalVisible(true)}
                style={[styles.selectorBtn, errors.category && { borderColor: '#FF3B30' }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ShoppingBag size={20} color={colors.theme} style={{ marginRight: 10 }} />
                  <Text style={[styles.selectorText, !category && { color: colors.textDisabled }]}>
                    {category || "Select Category"}
                  </Text>
                </View>
                <ChevronDown size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

              {/* Date Selector */}
              <TouchableOpacity
                onPress={() => setCalendarModalVisible(true)}
                style={[styles.selectorBtn, errors.date && { borderColor: '#FF3B30' }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CalendarIcon size={20} color={colors.theme} style={{ marginRight: 10 }} />
                  <Text style={[styles.selectorText, !date && { color: colors.textDisabled }]}>
                    {date || "Select Date"}
                  </Text>
                </View>
                <ChevronDown size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

              {/* Description Input */}
              <CustomInput
                label="Description"
                placeholder="What was this for?"
                value={desc}
                onChangeText={(text) => {
                  setDesc(text);
                  if (errors.desc) setErrors((p) => ({ ...p, desc: null }));
                }}
                leftIcon="file-document-outline"
                error={errors.desc}
              />

              {/* Amount Input */}
              <CustomInput
                label="Amount"
                placeholder="0.00"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                  if (errors.amount) setErrors((p) => ({ ...p, amount: null }));
                }}
                keyboardType="numeric"
                leftIcon="currency-inr"
                error={errors.amount}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save Transaction</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>

      {/* Nested Modals */}
      <SelectionModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onSelect={(item) => {
          setCategory(item);
          if (errors.category) setErrors((p) => ({ ...p, category: null }));
        }}
        data={categoryList}
        title="Select Category"
        selectedItem={category}
      />

      <Modal
        transparent={true}
        visible={calendarModalVisible}
        animationType="fade"
        onRequestClose={() => setCalendarModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => {
                setDate(day.dateString);
                if (errors.date) setErrors((p) => ({ ...p, date: null }));
                setCalendarModalVisible(false);
              }}
              theme={{
                backgroundColor: colors.surface,
                calendarBackground: colors.surface,
                textSectionTitleColor: colors.textSecondary,
                selectedDayBackgroundColor: colors.theme,
                selectedDayTextColor: '#ffffff',
                todayTextColor: colors.theme,
                dayTextColor: colors.text,
                textDisabledColor: colors.textDisabled,
                dotColor: colors.theme,
                selectedDotColor: '#ffffff',
                arrowColor: colors.theme,
                monthTextColor: colors.text,
              }}
            />
            <TouchableOpacity
              onPress={() => setCalendarModalVisible(false)}
              style={{ padding: 15, alignItems: "center" }}
            >
              <Text style={{ color: colors.theme, fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default AddTransactionModal;