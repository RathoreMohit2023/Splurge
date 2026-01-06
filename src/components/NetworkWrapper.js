// components/NetworkWrapper.js

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { WifiOff } from "lucide-react-native"; // Assuming you use lucide-react-native as seen in your snippets
import { ThemeContext } from './ThemeContext'; // Aapka Theme Context path adjust karein

const { width, height } = Dimensions.get('window');

const NetworkWrapper = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    // NetInfo listener subscribe karein
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  if (!isConnected) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor={colors.background} barStyle={colors.theme === 'dark' ? 'light-content' : 'dark-content'} />
        <View style={styles.content}>
          <WifiOff size={80} color={colors.textSecondary || 'gray'} />
          
          <Text style={[styles.title, { color: colors.text }]}>
            No Internet Connection
          </Text>
          
          <Text style={[styles.message, { color: colors.textSecondary }]}>
           Please check your connection and try again.
          </Text>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.theme || '#007AFF' }]} 
            onPress={handleRetry}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Agar internet hai, toh normal app (children) dikhao
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    width: '80%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default NetworkWrapper;