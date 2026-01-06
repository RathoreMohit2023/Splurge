import { StyleSheet, Platform, StatusBar } from 'react-native';

const getHeaderStyle = (colors, topInset = 0) => {
  // Android ke liye StatusBar.currentHeight, iOS ke liye safe-area inset
  const PADDING_TOP = Platform.OS === 'android' 
    ? (StatusBar.currentHeight || 0) + 10 
    : topInset + 5; // iOS Notch/Dynamic Island ke liye safe spacing

  const HEADER_BOTTOM_PADDING = 14;

  return StyleSheet.create({
    container: {
      paddingTop: PADDING_TOP,
      paddingBottom: HEADER_BOTTOM_PADDING,
      paddingHorizontal: 20,

      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      // Border Bottom Logic
      borderBottomWidth: 1,
      borderBottomColor: colors.background === '#080808' ? '#252525' : colors.border,

      // Shadow/Elevation
      elevation: 4,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },

    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    logo: {
      width: 75,
      height: 40,
      marginRight: 10,
    },

    tagline: {
      fontSize: 16,
      color: colors.theme,
      fontWeight: '700',
      letterSpacing: 0.5,
    },

    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

export default getHeaderStyle;