import React, { useContext, useEffect } from 'react';
import { Alert, View } from 'react-native';
import AppHeader from '../../components/Header';
import TabNavigator from '../../navigation/tabNavigator';
import { ThemeContext } from '../../components/ThemeContext';

const MainScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
 
  const handleThemeToggle = () => {
    toggleTheme();
    
  }
  return (
    <>
      <AppHeader
        showThemeToggle={true}
        navigation={navigation}
        onThemeTogglePress={handleThemeToggle}
      />

      <TabNavigator />
    </>
  );
};

export default MainScreen;
