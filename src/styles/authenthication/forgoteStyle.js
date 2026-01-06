import { StyleSheet } from "react-native";

const getForgotPasswordStyle = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
    padding: 8,
    marginLeft: -8, 
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  // Icon Styles
  iconContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.theme, // Dynamic Theme Color
    opacity: 0.15, 
  },
  // Text Styles
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text, // Dynamic Text
    marginBottom: 12,
    textAlign: "center",
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary, // Dynamic Secondary Text
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    width: "90%",
    fontFamily: 'serif',
  },
  // Form Styles
  form: {
    width: "100%",
  },
  primaryBtn: {
    backgroundColor: colors.theme,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'serif',
  },
  // Success View Specifics
  emailHighlight: {
    backgroundColor: colors.surface, // Dynamic Surface (Card color)
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border, // Dynamic Border
  },
  emailText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: 'serif',
  },
  resendBtn: {
    marginTop: 24,
  },
  resendText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'serif',
  }
});

export default getForgotPasswordStyle;