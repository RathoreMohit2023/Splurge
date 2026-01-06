import { StyleSheet } from "react-native";

const getWishlistStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: { 
    color: colors.text, 
    fontSize: 20, 
    fontWeight: "700",
    fontFamily: 'serif',
  },
  addBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.surface, // Changed from #000 to Surface for better Light mode look
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.theme,
  },
  addBtnText: { 
    color: colors.theme, 
    fontWeight: "600" ,
    fontFamily: 'serif',
    
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
  
  card: {
    flexDirection: 'row',
    backgroundColor: colors.tintedThemeColor, // Dynamic tint (e.g., light purple)
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.theme, // Inset look
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contentContainer: { 
    flex: 1 
  },
  rowBetween: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  name: { 
    color: colors.text, 
    fontSize: 16, 
    fontWeight: "600",
    fontFamily: 'serif', 
  },
  price: { 
    color: colors.theme, 
    fontSize: 16, 
    fontWeight: "700" ,
    fontFamily: 'serif',
  },
  desc: { 
    color: colors.textSecondary, 
    fontSize: 13, 
    marginTop: 4 ,
    fontFamily: 'serif',
  },
  divider: { 
    height: 1, 
    backgroundColor: colors.border, 
    marginVertical: 12 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  status: { 
    color: colors.textDisabled, 
    fontSize: 12, 
    textTransform: 'uppercase', 
    letterSpacing: 1 ,
    fontFamily: 'serif',
  },
  actions: { 
    flexDirection: 'row', 
    gap: 16 
  },
  iconBtn: { 
    opacity: 0.8 
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
    color: colors.textPrimary,   
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  
  emptySubText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 240,              
    fontFamily: 'serif',
  },
  
});

export default getWishlistStyles;