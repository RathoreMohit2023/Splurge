import { StyleSheet, Platform } from "react-native";

const getDashBoardStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greetingText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
        fontFamily : 'serif',
    },
    userName: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
        fontFamily : 'serif',
    },
    profileButton: {
        width: 45,
        height: 45,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tintedThemeColor,
    },
    profilePlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tintedThemeColor,
        borderWidth: 1,
        borderColor: colors.theme,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    profileInitials: {
        color: colors.theme,
        fontWeight: '700',
        fontFamily : 'serif',
    },
    
    // --- Hero Card ---
    heroCard: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 24,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.border,
    },
    heroIconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        marginTop: 20,
        marginBottom: 10,
    },
    heroLabel: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 6,
        fontFamily : 'serif',
    },
    heroValue: {
        color: colors.text,
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 0.5,
        fontFamily : 'serif',
    },
    heroFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(0, 230, 118, 0.1)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    trendText: {
        color: colors.success,
        fontSize: 14,
        fontWeight: '600',
        fontFamily : 'serif',
    },

    // --- Stats Grid ---
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        width: '48%',
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    statLabel: {
        color: colors.textSecondary,
        fontSize: 12,
        marginBottom: 8,
        fontFamily : 'serif',
    },
    statValue: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
        fontFamily : 'serif',
    },
    miniChartLine: {
        height: 3,
        width: '40%',
        backgroundColor: colors.theme,
        borderRadius: 2,
    },

    // --- Common Sections ---
    sectionContainer: {
        marginBottom: 20,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rowLink: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.theme,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        fontFamily : 'serif',
    },
    linkButton: {
        borderWidth: 1,
        borderColor: colors.theme,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    linkText: {
        color: colors.theme,
        fontSize: 14,
        fontWeight: '600',
        fontFamily : 'serif',
        marginLeft: 4,
    },

    // --- Goal Card ---
    goalCard: {
        backgroundColor: colors.theme,
        borderRadius: 24,
        padding: 20,
        shadowColor: colors.theme,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    goalIconBg: {
        backgroundColor: "rgba(255,255,255,0.2)",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: '700',
        fontFamily : 'serif',
    },
    percentageText: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 16,
        fontFamily : 'serif',
    },
    progressBarBackground: {
        height: 10,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        overflow: "hidden",
        marginTop: 16,
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.orange,
        borderRadius: 10,
    },
    textMutedSmall: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
        fontFamily : 'serif',
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    // --- MODIFIED: Transactions ---
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    transactionInfo: {
        flex: 1, // Allows this section to grow
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8, // Adds space between text and amount
    },
    iconCircle: {
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
    transactionDetails: {
        flex: 1, // Important for text wrapping
    },
    transactionTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        fontFamily : 'serif',
    },
    transactionSub: {
        color: colors.textSecondary,
        fontSize: 12,
        fontFamily : 'serif',
    },
    transactionAmount: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        fontFamily : 'serif',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    emptyText: {
        color: colors.textSecondary,
        fontSize: 15,
        fontFamily : 'serif',
    },

    // --- MODIFIED: Wishlist ---
    wishlistCard: {
        width: 150,
        minHeight: 120, // Set a min-height for consistency
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 18,
        padding: 14,
        marginRight: 12,
        borderWidth: 1,
        borderColor: colors.theme,
        justifyContent: 'space-between', // Pushes content to top and bottom
    },
    addWishlistCard: {
        width: 80,
        minHeight: 120,
        backgroundColor: "transparent",
        borderRadius: 18,
        marginRight: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    addWishlistText: {
        color: colors.theme,
        fontSize: 12,
        fontFamily : 'serif',
    },
    wishlistIcon: {
        backgroundColor: colors.theme,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wishlistName: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        fontFamily : 'serif',
    },
    wishlistDescription: {
        color: colors.textSecondary,
        fontSize: 12,
        fontFamily: 'serif',
        marginTop: 2,
    },
    wishlistPrice: {
        color: colors.theme,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily : 'serif',
    },
});

export default getDashBoardStyles;