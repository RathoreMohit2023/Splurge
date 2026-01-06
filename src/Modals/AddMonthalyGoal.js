import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";

import { X, Calendar as CalendarIcon } from "lucide-react-native";
import CustomInput from "../components/CustomInput";
import getAddMonthalyGoalStyle from "../styles/Modals/AddMonthalyGoalStryle";
import { ThemeContext } from "../components/ThemeContext";

const AddMonthalyGoal = ({ visible, onClose, onSave, initialValues }) => {
  const { colors } = useContext(ThemeContext);

  const styles = useMemo(() => getAddMonthalyGoalStyle(colors), [colors]);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(null);

  // Prefill values for EDIT mode
  useEffect(() => {
    if (visible && initialValues) {
      setAmount(initialValues?.amount?.toString() || "");
      setDate(initialValues?.date || "");
      setId(initialValues?.id);
    } else if (visible) {
      setAmount("");
      setDate("");
      setId(null);
    }
  }, [visible]);

  const handleSave = () => {
    if (!amount) return;

    onSave({
      amount: Number(amount),
      date: date || "Not Selected",
      id,
    });

    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {initialValues ? "Edit Goal" : "Set Monthly Goal"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <X size={22} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <CustomInput
              label="Amount"
              placeholder="Enter Target Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
       
          {/* Save */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>
              {initialValues ? "Update Goal" : "Save Goal"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddMonthalyGoal;
