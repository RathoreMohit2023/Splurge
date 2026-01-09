import React, { useEffect } from 'react';
import MainApp from './src/MainApp';
import { ThemeProvider } from './src/components/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store/Store';
import { Provider } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import NetworkWrapper from './src/components/NetworkWrapper';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from './src/services/RequestPermissions';
import { requestPermissions } from './src/services/FcmService';
const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '841623319340-hjts0mrogfelo99t6km4un0bd83bj77e.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    const requestAllPermissions = async () => {
      const granted = await requestPermissions();
      if (!granted) {
        console.log('❌ General permissions denied');
      }

      const cameraGranted = await requestCameraPermission();
      if (!cameraGranted) {
        console.log('❌ Camera permission denied');
      }

      const galleryGranted = await requestGalleryPermission();
      if (!galleryGranted) {
        console.log('❌ Gallery permission denied');
      }

      if (granted && cameraGranted && galleryGranted) {
        console.log('✅ All permissions granted');
      }
    };

    requestAllPermissions();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider>
            <NetworkWrapper>
              <MainApp />
            </NetworkWrapper>
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
