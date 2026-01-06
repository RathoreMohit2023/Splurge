import { StyleSheet } from "react-native";

const getHelpSupportStyle = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
  },
  content: {
    padding: 20,
  },
  // Brand Section
  brandSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: colors.surface, // Changed to Surface
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logo: {
    width: 140,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text, // Dynamic Text
    letterSpacing: 1,
    fontFamily: 'serif',
  },
  appVersion: {
    fontSize: 14,
    color: colors.textDisabled,
    marginTop: 4,
    marginBottom: 16,
    fontFamily: 'serif',
  },
  aboutText: {
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 22,
    fontSize: 14,
    maxWidth: '90%',
    fontFamily: 'serif',
  },
  // Card Styles
  card: {
    backgroundColor: colors.surface, // Dynamic Card Background
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
    fontFamily: 'serif',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border, // Dynamic Border
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.tintedThemeColor, // Tinted background for icons
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rowText: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
    fontFamily: 'serif',
  },
  value: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  // Footer
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: colors.textDisabled,
    fontSize: 14,
    marginBottom: 15,
    fontFamily: 'serif',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  socialIcon: {
    padding: 10,
    backgroundColor: colors.surface,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.border,
  },
  copyright: {
    color: colors.textDisabled,
    fontSize: 12,
    fontFamily: 'serif',
  },
});

export default getHelpSupportStyle;