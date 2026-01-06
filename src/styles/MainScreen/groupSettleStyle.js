import { StyleSheet, Platform } from "react-native";

const getGroupSettleStyle = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    inner: {
        paddingHorizontal: 16,
    },

    // --- Header ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: colors.text,
        fontSize: 26,
        fontWeight: "700",
        fontFamily: 'serif',
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 14,
        marginTop: 2,
        fontFamily: 'serif',
    },
    headerIconBtn: {
        padding: 10,
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },

    // --- Hero Card ---
    heroCard: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: colors.theme,
    },
    heroTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    heroLabel: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontFamily: 'serif',
    },
    shareBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        gap: 4,
        borderWidth: 1,
        borderColor: colors.border
    },
    shareText: {
        color: colors.text,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'serif',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 14,
        padding: 4,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "rgba(112, 21, 238, 0.1)",
    },
    codeText: {
        color: colors.text,
        fontSize: 22,
        fontFamily: 'serif',
        fontWeight: '700',
        letterSpacing: 1,
    },
    copyBtn: {
        backgroundColor: colors.theme,
        padding: 12,
        borderRadius: 10,
    },

    // --- Input Card ---
    inputCard: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 16,
        padding: 6,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: colors.border,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        paddingLeft: 10,
    },
    textInput: {
        flex: 1,
        color: colors.text,
        paddingHorizontal: 12,
        fontSize: 14,
        fontFamily: 'serif',
        height: 50,
    },
    addBtn: {
        backgroundColor: colors.text,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginRight: 2,
    },
    addBtnText: {
        color: colors.background,
        fontWeight: '700',
        fontSize: 14,
        fontFamily: 'serif',
    },

    // --- Sections ---
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 18,
        fontFamily: 'serif',
        fontWeight: "700",
    },
    logContainer: {
        marginTop: 12,
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 16,
        padding: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    // Update styles
    logContent: {
        flex: 1,
        paddingRight: 6,
    },
    
    logAmount: {
        width: 80,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    
    logAmountText: {
        fontSize: 14,
        fontWeight: "700",
    },
    
    linkText: {
        color: colors.theme,
        fontSize: 14,
        fontFamily: 'serif',
        fontWeight: "600",
    },
    linkBtn: {
        flexDirection: "row",
        backgroundColor : "transparent",
        padding: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.theme
    },

    // --- Friends List (FIXED LAYOUT) ---
    friendCard: {
        flexDirection: 'column', // Changed from row to column
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    friendCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.theme,
    },
    avatar: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },
    avatarLabel: {
        color: colors.theme,
        fontWeight: '700',
    },
    friendInfo: {
        marginLeft: 12,
    },
    friendName: {
        color: colors.text,
        fontSize: 16,
        fontFamily: 'serif',
        fontWeight: '600',
        marginBottom: 2,
    },
    settledText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontFamily: 'serif',
        
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 13,
        fontFamily: 'serif',
        fontWeight: 'bold',
    },
    actionIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.theme,
        marginLeft: 12
    },
    
    // --- Friend Footer (New Styles) ---
    friendFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        gap: 12,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: colors.background, // Slight contrast
        borderWidth: 1,
        borderColor: colors.border,
    },
    settleBtn: {
        backgroundColor: colors.text, // High visibility
        borderColor: colors.text,
    },
    actionBtnText: {
        fontSize: 12,
        fontFamily: 'serif',
        fontWeight: '600',
        marginLeft: 6,
        color: colors.text,
    },
    settleBtnText: {
        color: colors.background,
        borderWidth: 1,
        borderColor: colors.theme,

    },

    // --- Groups ---
    groupCard: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    groupIconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    groupName: {
        color: colors.text,
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'serif',
    },
    groupMembers: {
        color: colors.textSecondary,
        fontSize: 12,
        fontFamily: 'serif',
    },
    amountText: {
        color: colors.text,
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'serif',
    },
    progressContainer: {
        marginTop: 16,
    },
    noRecentContainer: {
        marginTop: 16,
        // alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
    },
    progressLabel: {
        color: colors.textSecondary,
        fontSize: 11,
        fontFamily: 'serif',
        marginBottom: 6,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.background,
    },

    friendCardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 12,
        gap: 12,
    },
    remindButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: colors.background, // Slight contrast
        borderWidth: 1,
        borderColor: colors.border,
    },
    remindButtonText: {
        fontSize: 12,
        fontFamily: 'serif',
        fontWeight: 'bold',
        marginLeft: 6,
        color: colors.text,
    },
    settleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: colors.background, // Slight contrast
        borderWidth: 1,
        borderColor: colors.border,
    },
    settleButtonText: {
        fontSize: 12,
        fontFamily: 'serif',
        fontWeight: 'bold',
        marginLeft: 6,
        color: colors.text,
    },

    // --- Logs ---
    logCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    logIcon: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    logTitle: {
        color: colors.text,
        fontSize: 14,
        fontFamily: 'serif',
        fontWeight: 'bold',
    },
    logDesc: {
        color: colors.textSecondary,
        fontSize: 12,
        fontFamily: 'serif',
    },
    logAmount: {
        fontWeight: '700',
        fontSize: 14,
        fontFamily: 'serif',
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    }
});

export default getGroupSettleStyle;