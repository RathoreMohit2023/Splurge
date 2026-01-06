import React, { useEffect } from 'react';
import MainApp from './src/MainApp';
import { ThemeProvider } from './src/components/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store/Store';
import { Provider } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import NetworkWrapper from './src/components/NetworkWrapper'; 

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '841623319340-hjts0mrogfelo99t6km4un0bd83bj77e.apps.googleusercontent.com',
      offlineAccess: true,
    });
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