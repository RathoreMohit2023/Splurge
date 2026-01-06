import React, { useContext, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet
} from "react-native";
import { X, CheckCircle2, ArrowRight } from "lucide-react-native";
import getSettleUpModalStyle from "../styles/Modals/SettleUpModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const SettleUpModal = ({ visible, onClose, onSave, friend }) => {
  const { colors } = useContext(ThemeContext);
  // Merge external styles with local styles for the new text elements
  const styles = useMemo(() => {
    const baseStyles = getSettleUpModalStyle(colors);
    return {
        ...baseStyles,
        ...localStyles(colors)
    };
  }, [colors]);

  if (!friend) return null;

  // Determine logic variables
  const amount = friend.owes > 0 ? friend.owes : friend.owed;
  const paymentDirection = friend.owed > 0 ? "paying" : "receiving";
  const defaultNote = "Settling up";

  const handleSave = () => {
    onSave({
      friendId: friend.id,
      amount: parseFloat(amount),
      note: defaultNote,
      date: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>

          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Settle Up</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={22} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Content Area */}
          <View style={styles.contentContainer}>
            
            {/* Context Row (Who pays whom) */}
            <View style={styles.contextHeader}>
              <View style={styles.contextRow}>
                <Text style={styles.contextText}>
                  {paymentDirection === "paying" ? "You" : friend.fullname}
                </Text>
                <ArrowRight size={16} color={colors.textSecondary} style={styles.arrowIcon} />
                <Text style={styles.contextText}>
                  {paymentDirection === "paying" ? friend.fullname : "You"}
                </Text>
              </View>
              <Text style={styles.contextSubText}>
                {paymentDirection === "paying"
                  ? `You are paying ${friend.fullname}`
                  : `${friend.fullname} is paying you`}
              </Text>
            </View>

            {/* Static Display of Amount */}
            <View style={styles.displayContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <Text style={styles.amountText}>{amount}</Text>
            </View>

            {/* Static Note */}
            <View style={styles.noteContainer}>
                <Text style={styles.noteLabel}>Note:</Text>
                <Text style={styles.noteText}>{defaultNote}</Text>
            </View>

          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <CheckCircle2 size={20} color="#FFF" style={styles.checkIcon} />
            <Text style={styles.saveBtnText}>Record Payment</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

// Local styles to handle the new static text display
const localStyles = (colors) => StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    displayContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 30,
        marginBottom: 20,
    },
    currencySymbol: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.primary,
        marginTop: 6,
        marginRight: 4
    },
    amountText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.text,
        letterSpacing: 1
    },
    noteContainer: {
        backgroundColor: colors.background, // Slight contrast background
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border
    },
    noteLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        marginRight: 6,
        fontWeight: '600'
    },
    noteText: {
        fontSize: 14,
        color: colors.text,
        fontStyle: 'italic'
    }
});

export default SettleUpModal;