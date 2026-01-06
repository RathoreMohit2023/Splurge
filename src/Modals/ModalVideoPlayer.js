import React from "react";
import { View, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { X } from "lucide-react-native";
import VideoPlayer from "../components/VideoPlayer";

const ModalVideoPlayer = ({ visible, onClose, videoUrl }) => {

  return (
    <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
    >
        <View style={styles.overlay}>
    
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={26} color="white" />
            </TouchableOpacity>

            <View style={styles.playerBox}>
                <VideoPlayer videoUrl={videoUrl} />
            </View>
        </View>
    </Modal>
  );
};

export default ModalVideoPlayer;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    // zIndex: 10
  },
  playerBox: {
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
    height: 250,
  },
});
