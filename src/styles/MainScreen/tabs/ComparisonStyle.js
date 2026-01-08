import { StyleSheet } from "react-native";

const getComparisonStyles = (colors) => StyleSheet.create({
  // --- Main Layout ---
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  listHeaderContainer: {
    marginBottom: 10,
  },
  suggestionPrice: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold',
    fontFamily : 'serif',
  },

  // --- Headings ---
  sectionHeaderContainer: {
    marginBottom: 8,
    // marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
  },
  sectionTitle: { 
    color: colors.text, 
    fontSize: 22, 
    fontWeight: "800", 
    letterSpacing: -0.5,
    fontFamily : 'serif',
  },
  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
    fontFamily : 'serif',
  },

  // --- Common Card Styles ---
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    fontFamily : 'serif',
  },

  // --- AI Insight Card (Special) ---
  aiCard: {
    backgroundColor: colors.tintedThemeColor || '#F3E5F5', // Fallback if tinted not def
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    // Soft Shadow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    // elevation: 4,
  },
  iconCircleAI: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardTitleAI: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily : 'serif',
  },
  aiContent: {
    paddingLeft: 4,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aiSummaryText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
    fontFamily : 'serif',
  },
  aiSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  aiSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    fontFamily : 'serif',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  aiText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    flex: 1,
    fontFamily : 'serif',

  },
  // Suggestions Chips
  suggestionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 8,
    fontFamily : 'serif',

  },

  // --- Major Purchase Card ---
  majorCard: {
    backgroundColor: colors.tintedThemeColor,
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  majorText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    fontFamily : 'serif',
  },
  amountHighlight: {
    color: colors.text,
    fontWeight: '800',
  },

  // --- Wishlist Item Card ---
  itemCard: {
    backgroundColor: colors.tintedThemeColor,
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.theme,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
    fontFamily: 'serif',
  },
  itemPrice: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'serif',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // --- Trade Off Section (Inside Item Card) ---
  tradeOffContainer: {
    marginTop: 14,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 10,
  },
  tradeOffHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  tradeOffLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily : 'serif',
  },
  tradeOffValueBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tradeOffItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    fontFamily : 'serif',
  },
  tradeOffArrow: {
    paddingHorizontal: 8,
  },
  tradeOffPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    fontFamily : 'serif',
  },

  // --- Empty State ---
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    fontFamily : 'serif',
  },
  headerIconBtn: {
    padding: 10,
    backgroundColor: colors.tintedThemeColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default getComparisonStyles;