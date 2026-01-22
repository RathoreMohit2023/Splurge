import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const showBlockedAlert = (typeLabel) => {
  return new Promise((resolve) => {
    Alert.alert(
      'Permission Blocked',
      `${typeLabel} access is blocked. Please enable it in the App Settings to continue.`,
      [
        { 
          text: 'Cancel', 
          style: 'cancel', 
          onPress: () => resolve(false) 
        },
        { 
          text: 'Open Settings', 
          onPress: () => {
            openSettings();
            resolve(false);
          } 
        },
      ],
      { cancelable: false }
    );
  });
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
    const res = await check(PERMISSIONS.IOS.CAMERA);
    if (res === RESULTS.GRANTED) return true;
    if (res === RESULTS.BLOCKED) return await showBlockedAlert('Camera');
    
    const requestResult = await request(PERMISSIONS.IOS.CAMERA);
    return requestResult === RESULTS.GRANTED;
  }

  // Android Logic
  const status = await check(PERMISSIONS.ANDROID.CAMERA);
  if (status === RESULTS.GRANTED) return true;
  if (status === RESULTS.BLOCKED) return await showBlockedAlert('Camera');

  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};
