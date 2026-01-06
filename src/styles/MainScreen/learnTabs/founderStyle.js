import { StyleSheet, Platform } from "react-native";

const getFounderTabStyles = (colors, isDark = false) => {

  const shadowStyle = Platform.select({
    ios: {
      shadowColor: isDark ? "rgba(255,255,255,0.2)" : "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.25 : 0.20,
      shadowRadius: isDark ? 6 : 5,
    },
    android: {
      // Android shadow = elevation only
      elevation: isDark ? 6 : 3,
    },
  });

  return StyleSheet.create({
    tabContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },

    listContent: {
      padding: 16,
      paddingTop: 20,
    },

    itemCard: {
      flexDirection: 'row',
      backgroundColor: colors.tintedThemeColor,
      borderRadius: 16,
      padding: 14,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },

    thumbnailBox: {
      width: 110,
      height: 70,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: colors.background,
      justifyContent: 'center',
      marginRight: 10,
      borderColor: colors.border,
    },
    
    thumbnailImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    
    playIconOverlay: {
      position: 'absolute',
      top: '35%',
      left: '40%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    

    titleText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 6,
      lineHeight: 22,
      fontFamily: 'serif',
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },

    subText: {
      color: colors.textSecondary,
      fontSize: 12,
      marginLeft: 6,
      fontFamily: 'serif',
    },

    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 'auto',
    },

    badgeText: {
      color: colors.success,
      fontSize: 11,
      fontWeight: '600',
      marginLeft: 4,
      fontFamily: 'serif',
    }
  });
};

export default getFounderTabStyles;
