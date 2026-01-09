import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const checkAndRequest = async (permission, typeLabel) => {
  try {
    const result = await check(permission);

    // अगर परमिशन पहले से मिली हुई है
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return true;
    }

    // अगर परमिशन 'BLOCKED' है (मतलब यूजर ने "Don't ask again" कर दिया है)
    if (result === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Blocked',
        `${typeLabel} access has been permanently denied. Please enable it in the App Settings to continue.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => openSettings() },
        ]
      );
      return false;
    }

    // अगर अभी तक ब्लॉक नहीं हुई है, तो रिक्वेस्ट करें
    const requestResult = await request(permission);
    return requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED;
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }
};

export const requestCamera = async () => {
  if (Platform.OS === 'ios') {
    return await checkAndRequest(PERMISSIONS.IOS.CAMERA, 'Camera');
  }

  // Android के लिए
  try {
    const result = await check(PERMISSIONS.ANDROID.CAMERA);
    console.log("result:", result);
    
    
    if (result === 'denied') {
        Alert.alert(
          'Permission Blocked',
          'Camera access is blocked. Please enable it in the App Settings to take photos.',
            [{ text: 'Cancel' }, { text: 'Settings', onPress: () => openSettings() }]
        );
        return false;
    }

    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (e) {
    return false;
  }
};

export const requestGallery = async () => {
  if (Platform.OS === 'ios') {
    return await checkAndRequest(PERMISSIONS.IOS.PHOTO_LIBRARY, 'Gallery');
  }

  // Android के लिए
  try {
    let permission = Platform.Version >= 33 
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES 
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

    const result = await check(permission);

    if (result === 'denied') {
        Alert.alert(
          'Permission Blocked',
          'Gallery access is blocked. Please enable it in the App Settings to upload photos.',
            [{ text: 'Cancel' }, { text: 'Settings', onPress: () => openSettings() }]
        );
        return false;
    }

    const granted = await PermissionsAndroid.request(
        Platform.Version >= 33 
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES 
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (e) {
    return false;
  }
};