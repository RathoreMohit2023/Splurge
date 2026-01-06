import { StyleSheet } from "react-native";

const getSettleUpModalStyle = (colors) => {
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContainer: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 20,
      width: "100%",
      maxWidth: 400,
      maxHeight: "80%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 10,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      fontFamily: "Inter-Bold",
    },
    scrollContent: {
      paddingBottom: 20,
    },
    contextHeader: {
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 12,
      marginBottom: 20,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    contextRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    contextText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    arrowIcon: {
      marginHorizontal: 10,
    },
    contextSubText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    form: {
      gap: 15,
    },
    saveBtn: {
      backgroundColor: colors.success,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "center",
      shadowColor: colors.success,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    saveBtnText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "Inter-SemiBold",
    },
    checkIcon: {
      marginRight: 8,
    },
  });
};

export default getSettleUpModalStyle;