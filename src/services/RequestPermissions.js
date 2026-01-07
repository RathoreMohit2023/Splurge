import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Helper function to check/request permission using react-native-permissions (Good for iOS & Android)
const checkAndRequestPermission = async (permission) => {
  try {
    const result = await check(permission);
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return true;
    }
    const requestResult = await request(permission);
    return requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED;
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }
};


export const requestCameraPermission = async () => {
  // --- iOS Logic ---
  if (Platform.OS === 'ios') {
    const hasPermission = await checkAndRequestPermission(PERMISSIONS.IOS.CAMERA);
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera access is required to capture photos.');
    }
    return hasPermission;
  }

  // --- Android Logic ---
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    Alert.alert('Permission Required', 'Camera access is required to capture photos.');
    return false;
  } catch (e) {
    console.warn('Camera permission error:', e);
    return false;
  }
};

export const requestGalleryPermission = async () => {
  // --- iOS Logic ---
  if (Platform.OS === 'ios') {
    const hasPermission = await checkAndRequestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Photo access is required to upload images.');
    }
    return hasPermission;
  }

  // --- Android Logic ---
  try {
    let permission;

    if (Platform.Version >= 33) {
      permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    } else {
      permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    }

    const granted = await PermissionsAndroid.request(permission);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    Alert.alert('Permission Required', 'Photo access is required to upload images.');
    return false;
  } catch (e) {
    console.warn('Gallery permission error:', e);
    return false;
  }
};