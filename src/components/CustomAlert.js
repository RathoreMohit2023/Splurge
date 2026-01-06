import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

const CustomAlert = ({
  visible,
  title = "Alert",
  message = "",
  showCancel = false,
  cancelText = "Cancel",
  confirmText = "OK",
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      {/* Background Blur */}
      <View style={styles.overlay}>
        <BlurView
          style={styles.blur}
          blurType="light"
          blurAmount={15}
        />

        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            {showCancel && (
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#111",
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  confirmBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#6200ee",
    borderRadius: 10,
  },
  cancelText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default CustomAlert;
