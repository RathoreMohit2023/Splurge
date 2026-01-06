import { StyleSheet } from "react-native";

const getCreateGroupModalStyle = (colors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)", // Overlay background usually stays dark
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.surface, // Dynamic: White (Light) / Dark Grey (Dark)
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text, // Dynamic Text
  },
  closeBtn: {
    padding: 8,
    backgroundColor: colors.background, // Dynamic button background
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formContainer: {
    gap: 10,
  },
  textAreaInput: {
    minHeight: 80,
    textAlignVertical: 'top'
  },
  createBtn: {
    backgroundColor: colors.theme, // Theme Color
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createBtnText: {
    color: "#fff", // Button text usually white
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default getCreateGroupModalStyle;