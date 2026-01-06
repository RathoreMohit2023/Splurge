import { StyleSheet } from 'react-native';

const getLoginStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    logo: {
      width: 140,
      height: 120,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      fontFamily: 'serif',
    },
    tagline: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 40,
      fontFamily: 'serif',
    },
    formContainer: {
      width: '100%',
    },
    forgotContainer: {
        alignSelf: "flex-end",
        marginBottom: 24,
    },
    
    forgotText: {
        color: colors.theme,
        fontWeight: "600",
        fontSize: 14,
        fontFamily: 'serif',
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
      marginTop: 10,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    rememberText: {
      color: colors.text,
      fontSize: 14,
      marginLeft: 8,
      fontFamily: 'serif',
    },
    primaryBtn: {
      backgroundColor: colors.theme,
      height: 56,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      elevation: 5,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    primaryBtnText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'serif',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      marginHorizontal: 10,
      color: colors.textDisabled,
      fontSize: 12,
      fontFamily: 'serif',
    },

    // --- UPDATED GOOGLE BUTTON STYLES ---
    googleBtn: {
      backgroundColor: colors.theme, 
      height: 56,
      borderRadius: 12,
      flexDirection: 'row', // Aligns Icon and Text horizontally
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors.border,
      // Add Shadow/Elevation for better UI
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    googleIcon: {
      width: 24,
      height: 24,
      marginRight: 12,
    },
    googleIconWrapper: {
      flexDirection: 'row',
      marginRight: 12, // Gap between Icon and Text
    },
    googleBtnText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'serif',
    },
    // -------------------------------------

    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontFamily: 'serif',
    },
    signUpText: {
      color: colors.theme,
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: 'serif',
    },
    loaderContainer: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    },
    loader: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
    },
  });

export default getLoginStyle;