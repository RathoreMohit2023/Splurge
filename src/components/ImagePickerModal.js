import React, { useContext } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../components/ThemeContext';

const ImagePickerModal = ({ 
  visible, 
  onClose, 
  onCameraPress, 
  onGalleryPress 
}) => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.background, // Theme based background
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      paddingBottom: 40,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 10,
    },
    headerBar: {
      width: 40,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    optionText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 15,
      fontWeight: '500',
    },
    cancelButton: {
      marginTop: 20,
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: colors.surface,
    },
    cancelText: {
      fontSize: 16,
      color: colors.error || 'red',
      fontWeight: 'bold',
    }
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {/* Drag Handle */}
              <View style={styles.headerBar} />
              
              <Text style={styles.title}>Upload Profile Photo</Text>

              {/* Camera Option */}
              <TouchableOpacity 
                style={styles.option} 
                onPress={() => { onClose(); onCameraPress(); }}
              >
                <View style={{ width: 40, alignItems: 'center' }}>
                    <MaterialCommunityIcons name="camera-outline" size={28} color={colors.theme} />
                </View>
                <Text style={styles.optionText}>Take Photo</Text>
              </TouchableOpacity>

              {/* Gallery Option */}
              <TouchableOpacity 
                style={[styles.option, { borderBottomWidth: 0 }]} 
                onPress={() => { onClose(); onGalleryPress(); }}
              >
                 <View style={{ width: 40, alignItems: 'center' }}>
                    <MaterialCommunityIcons name="image-outline" size={28} color={colors.theme} />
                </View>
                <Text style={styles.optionText}>Select from Gallery</Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImagePickerModal;