import React, { useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { X } from "lucide-react-native";

// Imports
import CustomInput from "../components/CustomInput";
import getCreateGroupModalStyle from "../styles/Modals/CreateGroupModalStyle"; // Style Function Import
import { ThemeContext } from "../components/ThemeContext"; // Context Import

const CreateGroupModal = ({ visible, onClose, onSubmit }) => {
  // 1. Context Hook
  const { colors } = useContext(ThemeContext);

  // 2. Styles Memoization
  const styles = useMemo(() => getCreateGroupModalStyle(colors), [colors]);

  const [groupName, setGroupName] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleCreate = () => {
    let currentErrors = {};
    if (!groupName) currentErrors.groupName = "Group Name is required";
    if (!budget) currentErrors.budget = "Monthly Budget is required";

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    onSubmit({
      groupName,
      budget,
      description,
    });
    
    resetForm();
  };

  const resetForm = () => {
    setGroupName("");
    setBudget("");
    setDescription("");
    setErrors({});
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          style={styles.overlay}
        >
          {/* Main Modal Card */}
          <View style={styles.modalContainer}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Group</Text>
              <TouchableOpacity 
                onPress={onClose} 
                style={styles.closeBtn}
                activeOpacity={0.7}
              >
                {/* Dynamic Icon Color */}
                <X size={22} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Form Content */}
            <View style={styles.formContainer}>
              
              {/* Group Name */}
              <CustomInput
                label="Group Name"
                placeholder="Weekend Trip"
                value={groupName}
                onChangeText={(text) => {
                  setGroupName(text);
                  if (errors.groupName) setErrors({...errors, groupName: null});
                }}
                leftIcon="account-group" 
                error={errors.groupName}
                // CustomInput needs to handle theming internally or accept style props
              />

              {/* Monthly Budget */}
              <CustomInput
                label="Monthly Budget (₹)"
                placeholder="10000"
                value={budget}
                onChangeText={(text) => {
                  setBudget(text);
                  if (errors.budget) setErrors({...errors, budget: null});
                }}
                keyboardType="numeric"
                leftIcon="currency-inr"
                error={errors.budget}
              />

              {/* Description */}
              <CustomInput
                label="Description (Optional)"
                placeholder="Trip to Goa with friends..."
                value={description}
                onChangeText={setDescription}
                leftIcon="notebook-edit-outline"
                multiline={true}
                numberOfLines={3}
                style={styles.textAreaInput}
              />

              {/* Create Button */}
              <TouchableOpacity
                style={styles.createBtn}
                activeOpacity={0.8}
                onPress={handleCreate}
              >
                <Text style={styles.createBtnText}>Create</Text>
              </TouchableOpacity>

            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateGroupModal;