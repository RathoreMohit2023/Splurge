import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const getNotificationStyle = (colors, themeType) => {
  // Helper to check if dark mode for specific shadow/opacity adjustments
  const isDark = themeType === "dark";

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 10,
      backgroundColor: colors.background,
      zIndex: 1,
    },
    backBtn: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: colors.tintedThemeColor,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      // Soft Shadow
      shadowColor: isDark ? "#000" : "#E0E5F2",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 4,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      fontFamily: "serif",
      letterSpacing: 0.5,
    },

    // Sub Header (Recent / Clear All)
    actionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginBottom: 15,
      marginTop: 5,
    },
    subHeaderLabel: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.textSecondary,
      letterSpacing: 1.2,
      opacity: 0.8,
    },
    clearBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 20,
      backgroundColor: isDark ? "rgba(238, 93, 80, 0.15)" : "#FFF0F0",
    },
    clearBtnText: {
      color: colors.error,
      fontSize: 12,
      fontWeight: "600",
    },

    // List
    listContent: {
      paddingHorizontal: 16,
    },
    sectionHeader: {
      color: colors.textSecondary,
      fontSize: 13,
      fontWeight: "700",
      marginTop: 20,
      marginBottom: 10,
      textTransform: "uppercase",
      letterSpacing: 1,
    },

    // Card
    card: {
      flexDirection: "row",
      backgroundColor: colors.tintedThemeColor,
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
      alignItems: "flex-start",
      borderWidth: 1,
      borderColor: isDark ? "transparent" : "rgba(255,255,255,0.6)",
    },
    unreadCard: {
      backgroundColor: isDark ? "#222738" : "#F4F7FF", // Highlighted background
      borderColor: colors.primary,
      borderWidth: 1,
    },

    iconContainer: {
      marginRight: 14,
    },
    iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor:  isDark ? colors.black : colors.white,
      justifyContent: "center",
      alignItems: "center",
    },
    unreadIconCircle: {
      backgroundColor: colors.tintedThemeColor || "rgba(67, 24, 255, 0.1)",
    },

    contentContainer: {
      flex: 1,
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 4,
    },
    title: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "700",
      flex: 1,
      marginRight: 8,
      fontFamily: "serif",
    },
    unreadTitle: {
      color: colors.text,
      fontWeight: "700",
    },
    time: {
      color: colors.textSecondary,
      fontSize: 11,
      marginTop: 2,
      fontWeight: "500",
    },
    message: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      fontFamily: "serif",
      marginTop: 2,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
      position: "absolute",
      top: 18,
      right: 16,
    },

    // Action Buttons (Accept/Decline)
    actionButtonContainer: {
      flexDirection: "row",
      marginTop: 14,
      gap: 12,
    },
    btnAccept: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    btnDecline: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    btnTextWhite: {
      color: "#FFF",
      fontSize: 12,
      fontWeight: "600",
    },
    btnTextDecline: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "600",
    },

    // Status Tag (Accepted/Declined)
    statusTag: {
      alignSelf: "flex-start",
      marginTop: 10,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
    },
    statusText: {
      fontSize: 11,
      fontWeight: "700",
      textTransform: "uppercase",
    },

    // Empty State
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: height * 0.15,
    },
    emptyIconBg: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.tintedThemeColor || "rgba(67, 24, 255, 0.05)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "700",
      fontFamily: "serif",
    },
    emptySub: {
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: 8,
      fontFamily: "serif",
      textAlign: "center",
      width: "70%",
    },

    // Snackbar Override
    snackbar: {
      backgroundColor: colors.text, // Use dark text color for snackbar bg
      borderRadius: 12,
      marginBottom: 20,
    },
  });
};

export default getNotificationStyle;