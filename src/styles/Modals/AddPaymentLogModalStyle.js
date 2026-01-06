import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const getAddPaymentLogModalStyle = (colors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // KeyboardAvoidingView ke liye zaroori hai
    width: "100%",
    height: "100%", 
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    // Max height set karenge taaki keyboard aane par adjust ho sake
    maxHeight: height * 0.85, 
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15, // Thoda kam kiya space save karne ke liye
    flexShrink: 0, // Header shrink nahi hona chahiye
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'serif',
    fontWeight: "700",
    color: colors.text,
  },
  modalSubtitle: {
    fontSize: 13,
    fontFamily: 'serif',
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeIconBtn: {
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  scrollContent: {
    paddingBottom: 20, // Scroll ke neeche thodi jagah
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: 'serif',
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  
  /* Modern Selector Styling */
  modernSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  selectorValue: {
    fontSize: 15,
    fontFamily: 'serif',
    color: colors.text,
    fontWeight: "500",
  },
  placeholderText: {
    color: colors.textDisabled || colors.placeholder,
  },
  errorBorder: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    fontFamily: 'serif',
    marginTop: 4,
    marginLeft: 4,
  },

  /* Buttons */
  actionRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    gap: 12,
    flexShrink: 0, // Buttons shrink nahi hone chahiye
  },
  cancelButton: {
    flex: 1,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "transparent",
  },
  saveButton: {
    flex: 1.5,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.theme,
    elevation: 4,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: "600",
    color: colors.textSecondary,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: "700",
    color: "#fff",
  },

  /* Calendar Overlay */
  calendarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarBox: {
    width: "85%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeCalendarBtn: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 10
  },
  closeCalendarText: {
    color: colors.theme,
    fontWeight: '600'
  }
});

export default getAddPaymentLogModalStyle;