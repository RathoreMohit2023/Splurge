import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../components/ThemeContext";

const MultiSelectionModal = ({
  visible,
  title,
  data = [],
  selectedItems = [],
  onClose,
  onSelect,
  emptyMessage = "No Data Available",
}) => {
  const { colors } = useContext(ThemeContext);

  const [tempSelected, setTempSelected] = useState([]);

  useEffect(() => {
    if (visible) {
      setTempSelected(selectedItems);
    }
  }, [visible]);

  const toggleSelect = (item) => {
    if (tempSelected.includes(item)) {
      setTempSelected(tempSelected.filter((i) => i !== item));
    } else {
      setTempSelected([...tempSelected, item]);
    }
  };

  const handleSave = () => {
    onSelect(tempSelected);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade"
      transparent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.card,
            padding: 20,
            width: "90%",
            borderRadius: 20,
            maxHeight: "70%",
          }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "700", color: colors.text, fontFamily: 'serif' }}
            >
              {title}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={colors.theme} />
            </TouchableOpacity>
          </View>

          {/* LIST */}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            
            // --- CHANGES START HERE (Empty State Logic) ---
            ListEmptyComponent={() => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 30,
                }}
              >
                <Icon
                  name="clipboard-alert-outline"
                  size={40}
                  color={colors.textSecondary}
                  style={{ marginBottom: 10 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.textSecondary,
                    textAlign: "center",
                    fontFamily: 'serif',
                  }}
                >
                  {emptyMessage}
                </Text>
              </View>
            )}
            // --- CHANGES END HERE ---

            renderItem={({ item }) => {
              const isSelected = tempSelected.includes(item);

              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border || "#ccc", // Optional separator
                  }}
                  onPress={() => toggleSelect(item)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.text,
                      fontFamily: 'serif',
                    }}
                  >
                    {item}
                  </Text>

                  {isSelected ? (
                    <Icon
                      name="checkbox-marked"
                      size={24}
                      color={colors.theme}
                    />
                  ) : (
                    <Icon
                      name="checkbox-blank-outline"
                      size={24}
                      color={colors.textSecondary}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />

          {/* FOOTER BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 15,
            }}
          >
            {/* Cancel */}
            <TouchableOpacity
              onPress={onClose}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: colors.textSecondary,fontFamily: 'serif', }}>
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Save Button (Disabled if no data) */}
            {data.length > 0 && (
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  backgroundColor: colors.theme,
                  paddingVertical: 10,
                  paddingHorizontal: 22,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "white",fontFamily: 'serif', }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MultiSelectionModal;