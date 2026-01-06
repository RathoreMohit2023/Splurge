import { StyleSheet } from "react-native";

const getLedgerStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.tintedThemeColor,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  summaryLabel: { 
    color: colors.textSecondary, 
    fontSize: 14, 
    marginBottom: 4 ,
    fontFamily: 'serif',
  },
  summaryValue: { 
    color: colors.text, 
    fontSize: 32, 
    fontWeight: "700" ,
    fontFamily: 'serif',
  },
  addButton: {
    backgroundColor: colors.theme,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  itemCard: {
    backgroundColor: colors.tintedThemeColor,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: { 
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1,
    marginRight: 8,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.theme,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textInfo: { 
    flex: 1 
  },
  itemTitle: { 
    color: colors.text, 
    fontSize: 16, 
    fontWeight: "600" ,
    fontFamily: 'serif',
  },
  itemSub: { 
    color: colors.textSecondary, 
    fontSize: 12, 
    marginTop: 2 ,
    fontFamily: 'serif',
  },
  amountText: { 
    color: colors.text, 
    fontSize: 16, 
    fontWeight: "700" ,
    fontFamily: 'serif',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  emptySubText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 240,
    fontFamily: 'serif',
  },
  divider: { 
    height: 1, 
    backgroundColor: colors.border, 
    marginVertical: 12 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    gap: 20,
  },
  iconBtn: { 
    padding: 4,
  },
});

export default getLedgerStyles;