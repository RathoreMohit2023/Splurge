import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
  X,
  User,
  ArrowRightLeft,
  Calendar as CalendarIcon,
  ChevronDown,
} from 'lucide-react-native';

// Imports
import CustomInput from '../components/CustomInput';
import SelectionModal from '../components/SelectionModal';
import getAddPaymentLogModalStyle from '../styles/Modals/AddPaymentLogModalStyle';
import { ThemeContext } from '../components/ThemeContext';

const TYPE_OPTIONS = [
  { label: 'They owe me', value: 'they_owe_me' },
  { label: 'I owe them', value: 'i_owe_them' },
];

const AddPaymentLogModal = ({ visible, onClose, friends = [], onSave }) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddPaymentLogModalStyle(colors), [colors]);

  // --- Form State ---
  const [friend, setFriend] = useState(null);
  const [type, setType] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  // --- Modal Control State ---
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [selectionData, setSelectionData] = useState([]);
  const [selectionTitle, setSelectionTitle] = useState('');
  const [selectionMode, setSelectionMode] = useState(null);

  const validate = () => {
    let temp = {};
    if (!friend) temp.friend = 'Who is this transaction with?';
    if (!type) temp.type = 'Who owes whom?';
    if (!amount) temp.amount = 'Amount is required';
    if (!description) temp.description = 'Description is required';

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ friend, type, amount, description, date });
    resetForm();
  };

  const resetForm = () => {
    setFriend(null);
    setType(null);
    setAmount('');
    setDescription('');
    setDate(new Date());
    setErrors({});
    onClose();
  };

  const handleOpenFriendSelect = () => {
    Keyboard.dismiss(); 
    const friendNames = friends?.map(f => f.fullname);
    setSelectionData(friendNames);
    setSelectionTitle('Select Friend');
    setSelectionMode('FRIEND');
    setSelectionVisible(true);
  };

  const handleOpenTypeSelect = () => {
    Keyboard.dismiss();
    const typeLabels = TYPE_OPTIONS.map(t => t.label);
    setSelectionData(typeLabels);
    setSelectionTitle('Select Type');
    setSelectionMode('TYPE');
    setSelectionVisible(true);
  };

  const handleSelection = selectedItemString => {
    if (selectionMode === 'FRIEND') {
      const selectedFriend = friends?.find(
        f => f.fullname === selectedItemString,
      );
      if (selectedFriend) {
        setFriend({ label: selectedFriend.fullname, value: selectedFriend.id });
        setErrors(prev => ({ ...prev, friend: '' }));
      }
    } else if (selectionMode === 'TYPE') {
      const selectedType = TYPE_OPTIONS.find(
        t => t.label === selectedItemString,
      );
      if (selectedType) {
        setType(selectedType);
        setErrors(prev => ({ ...prev, type: '' }));
      }
    }
    setSelectionVisible(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      {/* 
          FIX: KeyboardAvoidingView is now the main wrapper.
          style is used instead of contentContainerStyle.
       */}
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        {/* Optional: Dismiss keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            {/* Header (Outside ScrollView so it sticks) */}

            {/* ScrollView wraps Inputs and Buttons */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled" // Important for touch events
            >
              <View style={styles.header}>
                <View>
                  <Text style={styles.modalTitle}>New Payment Log</Text>
                  <Text style={styles.modalSubtitle}>
                    Track debts and credits
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={resetForm}
                  style={styles.closeIconBtn}
                >
                  <X size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* --- FRIEND SELECTOR --- */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>With whom?</Text>
                <TouchableOpacity
                  style={[
                    styles.modernSelector,
                    errors.friend && styles.errorBorder,
                  ]}
                  onPress={handleOpenFriendSelect}
                  activeOpacity={0.7}
                >
                  <View style={styles.selectorLeft}>
                    <View
                      style={[styles.iconBadge, { backgroundColor: '#E3F2FD' }]}
                    >
                      <User size={20} color="#2196F3" />
                    </View>
                    <Text
                      style={[
                        styles.selectorValue,
                        !friend && styles.placeholderText,
                      ]}
                    >
                      {friend?.label || 'Select Friend'}
                    </Text>
                  </View>
                  <ChevronDown size={20} color={colors.textSecondary} />
                </TouchableOpacity>
                {errors.friend && (
                  <Text style={styles.errorText}>{errors.friend}</Text>
                )}
              </View>

              {/* --- TYPE SELECTOR --- */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Type</Text>
                <TouchableOpacity
                  style={[
                    styles.modernSelector,
                    errors.type && styles.errorBorder,
                  ]}
                  onPress={handleOpenTypeSelect}
                  activeOpacity={0.7}
                >
                  <View style={styles.selectorLeft}>
                    <View
                      style={[styles.iconBadge, { backgroundColor: '#F3E5F5' }]}
                    >
                      <ArrowRightLeft size={20} color="#9C27B0" />
                    </View>
                    <Text
                      style={[
                        styles.selectorValue,
                        !type && styles.placeholderText,
                      ]}
                    >
                      {type?.label || 'Select Type'}
                    </Text>
                  </View>
                  <ChevronDown size={20} color={colors.textSecondary} />
                </TouchableOpacity>
                {errors.type && (
                  <Text style={styles.errorText}>{errors.type}</Text>
                )}
              </View>

              {/* --- DATE SELECTOR --- */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity
                  style={styles.modernSelector}
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowCalendar(true);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.selectorLeft}>
                    <View
                      style={[styles.iconBadge, { backgroundColor: '#E8F5E9' }]}
                    >
                      <CalendarIcon size={20} color="#4CAF50" />
                    </View>
                    <Text style={styles.selectorValue}>
                      {date.toDateString()}
                    </Text>
                  </View>
                  <ChevronDown size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* --- AMOUNT & DESCRIPTION --- */}
              <View style={styles.inputGroup}>
                <CustomInput
                  label="Amount"
                  value={amount}
                  onChangeText={text => {
                    setAmount(text);
                    setErrors(prev => ({ ...prev, amount: '' }));
                  }}
                  keyboardType="numeric"
                  leftIcon="currency-inr"
                  error={errors.amount}
                />
              </View>

              <View style={styles.inputGroup}>
                <CustomInput
                  label="Description"
                  value={description}
                  onChangeText={text => {
                    setDescription(text);
                    setErrors(prev => ({ ...prev, description: '' }));
                  }}
                  leftIcon="text"
                  error={errors.description}
                />
              </View>

              {/* --- ACTION BUTTONS (Inside ScrollView now) --- */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={resetForm}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Save Log</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* --- REUSABLE SELECTION MODAL --- */}
      <SelectionModal
        visible={selectionVisible}
        onClose={() => setSelectionVisible(false)}
        onSelect={handleSelection}
        data={selectionData}
        title={selectionTitle}
        selectedItem={
          selectionMode === 'FRIEND'
            ? friend?.label
            : selectionMode === 'TYPE'
            ? type?.label
            : ''
        }
      />

      {/* --- CALENDAR MODAL --- */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarBox}>
            <Calendar
              onDayPress={day => {
                const selected = new Date(day.dateString);
                setDate(selected);
                setShowCalendar(false);
              }}
              markedDates={{
                [date.toISOString().split('T')[0]]: {
                  selected: true,
                  selectedColor: colors.theme,
                },
              }}
              theme={{
                calendarBackground: colors.surface,
                textSectionTitleColor: colors.textSecondary,
                selectedDayBackgroundColor: colors.theme,
                selectedDayTextColor: '#ffffff',
                todayTextColor: colors.theme,
                dayTextColor: colors.text,
                textDisabledColor: colors.textDisabled || '#d9e1e8',
                dotColor: colors.theme,
                selectedDotColor: '#ffffff',
                arrowColor: colors.theme,
                monthTextColor: colors.text,
                indicatorColor: colors.theme,
              }}
            />
            <TouchableOpacity
              style={styles.closeCalendarBtn}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeCalendarText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default AddPaymentLogModal;
