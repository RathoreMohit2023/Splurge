import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView, // Imported
  Platform, // Imported
} from "react-native";
import { Calendar } from "react-native-calendars";
import { 
  X, 
  User, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  Check, 
} from "lucide-react-native";

// Imports
import CustomInput from "../components/CustomInput"; 
import SelectionModal from "../components/SelectionModal"; 
import getAddGroupExpenseModalStyle from "../styles/Modals/AddGroupExpenseModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const AddGroupExpenseModal = ({
  visible,
  onClose,
  onSubmit,
  groupMembers = [], 
  currentUser 
}) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddGroupExpenseModalStyle(colors), [colors]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitAmong, setSplitAmong] = useState([]); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showPayerModal, setShowPayerModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (visible && groupMembers.length > 0) {
      setSplitAmong(groupMembers.map((m) => m.user_id));
      if (currentUser?.user?.fullname) {
        setPaidBy(currentUser.user.fullname);
      }
    } else if (!visible) {
      resetForm();
    }
  }, [visible, groupMembers, currentUser]);

  const validate = () => {
    let tempErrors = {};
    if (!description.trim()) tempErrors.description = "Description is required";
    if (!amount.trim() || isNaN(amount) || parseFloat(amount) <= 0) tempErrors.amount = "Enter a valid amount";
    if (!paidBy) tempErrors.paidBy = "Payer is required";
    if (splitAmong.length === 0) tempErrors.split = "Select at least one member to split with";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSubmit({
        description,
        amount: parseFloat(amount),
        paidBy,
        splitAmong,
        date,
      });
    }
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setPaidBy("");
    setSplitAmong([]);
    setDate(new Date().toISOString().split('T')[0]);
    setErrors({});
    onClose();
  };

  const toggleSplit = (userId) => {
    setSplitAmong(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handlePayerSelect = (name) => {
    setPaidBy(name);
    setErrors(prev => ({ ...prev, paidBy: null }));
  };
  
  const memberNames = useMemo(() => groupMembers.map(m => m.user?.fullname).filter(Boolean), [groupMembers]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={resetForm}
      statusBarTranslucent={true}
    >
      {/* WRAPPER: KeyboardAvoidingView is the main overlay now */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={styles.overlay}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            
            {/* Header: Kept outside ScrollView to stay fixed at top */}
            

            {/* ScrollView: Only for form content */}
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.header}>
              <View>
                <Text style={styles.title}>Add Group Expense</Text>
                <Text style={styles.subtitle}>Track shared costs efficiently</Text>
              </View>
              <TouchableOpacity onPress={resetForm} style={styles.closeBtn}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
              <View style={styles.inputWrapper}>
                <CustomInput
                  label="Description"
                  placeholder="e.g. Dinner at Mario's"
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                    if(errors.description) setErrors({...errors, description: null});
                  }}
                  leftIcon="text"
                  error={errors.description}
                />
              </View>
              <View style={styles.inputWrapper}>
                <CustomInput
                  label="Total Amount"
                  placeholder="0.00"
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                    if(errors.amount) setErrors({...errors, amount: null});
                  }}
                  keyboardType="numeric"
                  leftIcon="currency-inr"
                  error={errors.amount}
                />
              </View>

              {/* Payer Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Paid By</Text>
                <TouchableOpacity 
                  style={[styles.selectorCard, errors.paidBy && styles.errorBorder]}
                  onPress={() => {
                      Keyboard.dismiss();
                      setShowPayerModal(true);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.selectorLeft}>
                    <View style={styles.iconBadge}>
                       <User size={20} color={colors.theme} /> 
                    </View>
                    <View>
                      <Text style={styles.selectorLabel}>Payer</Text>
                      <Text style={styles.selectorValue}>{paidBy || "Select Payer"}</Text>
                    </View>
                  </View>
                  <ChevronDown size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Split Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Split Among</Text>
                <View style={styles.splitContainer}>
                  {groupMembers.map((member) => {
                    const isSelected = splitAmong.includes(member.user_id);
                    return (
                      <TouchableOpacity
                        key={member.user_id}
                        style={[styles.splitItem, isSelected && styles.splitItemSelected]}
                        onPress={() => toggleSplit(member.user_id)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.splitItemLeft}>
                            <View style={[styles.avatarPlaceholder, isSelected && styles.avatarSelected]}>
                                <Text style={[styles.avatarText, isSelected && styles.avatarTextSelected]}>
                                    {(member.user?.fullname || 'NA').charAt(0)}
                                </Text>
                            </View>
                            <Text style={[styles.splitName, isSelected && styles.splitNameSelected]}>
                                {member.user_id === currentUser?.user_id ? "You" : member.user?.fullname}
                            </Text>
                        </View>
                        {isSelected && <Check size={16} color={colors.theme} />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {errors.split && <Text style={styles.errorText}>{errors.split}</Text>}
              </View>

              {/* Date Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity 
                  style={styles.selectorCard}
                  onPress={() => {
                      Keyboard.dismiss();
                      setShowCalendar(true);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.selectorLeft}>
                    <View style={styles.iconBadge}>
                       <CalendarIcon size={20} color={colors.theme} /> 
                    </View>
                    <View>
                      <Text style={styles.selectorLabel}>Transaction Date</Text>
                      <Text style={styles.selectorValue}>{date}</Text>
                    </View>
                  </View>
                  <ChevronDown size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
                <Text style={styles.submitBtnText}>Add Expense</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Helper Modals */}
      <SelectionModal
        visible={showPayerModal}
        onClose={() => setShowPayerModal(false)}
        onSelect={handlePayerSelect}
        data={memberNames}
        title="Who paid for this?"
        selectedItem={paidBy}
      />

      <Modal
        transparent={true}
        visible={showCalendar}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableOpacity style={styles.calendarOverlay} activeOpacity={1} onPress={() => setShowCalendar(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={(day) => {
                  setDate(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{ [date]: { selected: true, selectedColor: colors.theme } }}
                theme={{
                  backgroundColor: colors.surface,
                  calendarBackground: colors.surface,
                  dayTextColor: colors.text,
                  monthTextColor: colors.text,
                  arrowColor: colors.theme,
                  todayTextColor: colors.theme,
                  textDisabledColor: colors.textDisabled || colors.border,
                  selectedDayBackgroundColor: colors.theme,
                  selectedDayTextColor: "#ffffff",
                }}
              />
              <TouchableOpacity style={styles.closeCalendarBtn} onPress={() => setShowCalendar(false)}>
                <Text style={styles.closeCalendarText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </Modal>
  );
};

export default AddGroupExpenseModal;