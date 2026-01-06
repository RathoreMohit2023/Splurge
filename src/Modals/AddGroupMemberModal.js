import React, { useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { X, UserPlus, ChevronDown, User } from "lucide-react-native";

import MultiSelectionModal from "./MultiSelectionModal";
import getAddGroupMemberModalStyle from "../styles/Modals/AddGroupMemberModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const AddGroupMemberModal = ({ 
  visible, 
  onClose, 
  onSubmit, 
  friends = [] 
}) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddGroupMemberModalStyle(colors), [colors]);

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [error, setError] = useState("");
  
  const handleAdd = () => {
    if (selectedFriends.length === 0) {
      setError("Please select at least one friend to add.");
      return;
    }
    onSubmit(selectedFriends);
    resetForm();
  };

  const resetForm = () => {
    setSelectedFriends([]);
    setError("");
    onClose();
  };

  const handleConfirmSelection = (selectedNames) => {
    const friendObjects = friends.filter(friend => selectedNames.includes(friend.fullname));
    setSelectedFriends(friendObjects);
    if(friendObjects.length > 0){
      setError("");
    }
  };
  
  // NEW: Chip se friend ko deselect karne ke liye function
  const handleDeselectFriend = (friendId) => {
    const updatedFriends = selectedFriends.filter(friend => friend.id !== friendId);
    setSelectedFriends(updatedFriends);
  };

  const getDisplayText = () => {
    const count = selectedFriends.length;
    if (count === 0) {
      return "Select friends...";
    }
    if (count === 1) {
      return selectedFriends[0].fullname;
    }
    return `${count} friends selected`;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={resetForm}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Add Members</Text>
              <Text style={styles.subtitle}>Select friends to join the group</Text>
            </View>
            <TouchableOpacity onPress={resetForm} style={styles.closeBtn}>
              <X size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Select Friends</Text>
            
            <TouchableOpacity
              style={[styles.selector, error ? styles.selectorError : null]}
              onPress={() => setSelectionVisible(true)}
              activeOpacity={0.7}
            >
              <View style={styles.selectorLeft}>
                <View style={styles.iconBadge}>
                  <User size={20} color={colors.theme} />
                </View>
                <Text 
                  style={[
                    styles.selectorText, 
                    selectedFriends.length === 0 && styles.placeholderText
                  ]}
                >
                  {getDisplayText()}
                </Text>
              </View>
              <ChevronDown size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            {/* NEW: Yahan par selected friends ke chips dikhaye jayenge */}
            {selectedFriends.length > 0 && (
              <View style={styles.chipDisplayContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {selectedFriends.map((friend) => (
                    <View key={friend.id} style={styles.chip}>
                      <Text style={styles.chipText}>{friend.fullname}</Text>
                      <TouchableOpacity onPress={() => handleDeselectFriend(friend.id)}>
                        <X size={14} color={colors.theme} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.cancelBtn} 
              onPress={resetForm}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.addBtn} 
              onPress={handleAdd}
              activeOpacity={0.8}
            >
              <UserPlus size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.addBtnText}>Add Members ({selectedFriends.length})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <MultiSelectionModal
        visible={selectionVisible}
        onClose={() => setSelectionVisible(false)}
        title="Select Friends"
        data={friends?.map(f => f.fullname)}
        onSelect={handleConfirmSelection}
        selectedItems={selectedFriends.map(f => f.fullname)}
      />
    </Modal>
  );
};

export default AddGroupMemberModal;