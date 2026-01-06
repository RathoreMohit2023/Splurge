import React, { useEffect, useRef, useContext, useMemo } from 'react';
import { View, Animated, StatusBar } from 'react-native';
import { darkLogo, MainLogo } from '../../Assets/Images';
import getSplashStyles from '../../styles/Splashstyle/splashStyle';
import { ThemeContext } from '../../components/ThemeContext';

const SplashScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getSplashStyles(colors), [colors]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
   const appLogo = themeType === "dark" ? darkLogo : MainLogo;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('signIn');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <Animated.Image
        source={appLogo}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />

      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        Spend smarter. Live better.
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;
