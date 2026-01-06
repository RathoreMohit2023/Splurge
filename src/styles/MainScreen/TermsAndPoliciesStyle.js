import { StyleSheet } from "react-native";

const getTermsAndPoliciesStyle = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerSection: {
    marginTop: 10,
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text, // Dynamic Text
    marginBottom: 8,
    letterSpacing: 0.5,
    fontFamily: 'serif',
  },
  subTitle: {
    fontSize: 13,
    color: colors.textDisabled, // Dynamic Disabled Text
    marginBottom: 16,
    fontWeight: '500',
    fontFamily: 'serif',
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    fontFamily: 'serif',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: colors.surface, // Dynamic Surface
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    // Dynamic Shadow
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.background, // Inset look
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'serif',
  },
  cardContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    fontFamily: 'serif',
  },
  contactSection: {
    marginTop: 35,
  },
  contactHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
    fontFamily: 'serif',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.theme, // Always Theme Color
    padding: 16,
    borderRadius: 16,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF', // Always White on Theme Color
    fontFamily: 'serif',
  },
  contactSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    fontFamily: 'serif',
  },
});

export default getTermsAndPoliciesStyle;