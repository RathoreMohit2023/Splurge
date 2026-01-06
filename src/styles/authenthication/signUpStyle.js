import { StyleSheet } from "react-native";

const getSignUpStyle = (colors) => StyleSheet.create({
  // Screen Container
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  scrollContainer: { 
    flexGrow: 1, 
    paddingHorizontal: 24, 
    paddingBottom: 40 
  },

  // Header
  header: { 
    marginTop: 40, 
    marginBottom: 30 
  },
  backButton: { 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    marginBottom: 20, 
    marginTop: 8 
  },
  title: { 
    fontSize: 32, 
    fontWeight: "bold", 
    color: colors.text, 
    marginBottom: 5,
    fontFamily: 'serif',
  },
  subtitle: { 
    fontSize: 16, 
    color: colors.textSecondary,
    fontFamily: 'serif',
  },

  // Form
  formContainer: { 
    width: "100%" 
  },
  
  // Dropdown Trigger Styles
  dropdownContainer: { 
    marginBottom: 12 
  },
  dropdownTrigger: {
    height: 58,
    backgroundColor: colors.background, // Input background color
    borderRadius: 12,
    borderWidth: 1,
    // Default border color logic component mein handle hogi (error vs normal)
    borderColor: colors.border, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  dropdownText: { 
    fontSize: 16,
    fontFamily: 'serif',
  },
  errorText: { 
    color: colors.error, 
    fontSize: 12, 
    marginTop: 4, 
    marginLeft: 12,
    fontFamily: 'serif',
  },
  
  // Buttons
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
  },
  primaryBtnText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold",
    fontFamily: 'serif',
  },

  // Footer
  footer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 24 
  },
  footerText: { 
    color: colors.textSecondary, 
    fontSize: 14,
    fontFamily: 'serif',
  },
  linkText: { 
    color: colors.theme, 
    fontWeight: "bold", 
    fontSize: 14,
    fontFamily: 'serif',
  },
});

export default getSignUpStyle;