import { StyleSheet } from "react-native";

const AddMonthalyGoalStyle = (colors) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.surface, // Dynamic: White (Light) / Dark Grey (Dark)
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    color: colors.text, // Dynamic Text
  },
  form: {
    marginBottom: 20,
  },
  selectorBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background, // Inset look
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  selectorText: {
    fontSize: 16,
    color: colors.text,
  },
  saveBtn: {
    backgroundColor: colors.theme,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    elevation: 2,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  calendarContainer: {
    width: "85%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default AddMonthalyGoalStyle;