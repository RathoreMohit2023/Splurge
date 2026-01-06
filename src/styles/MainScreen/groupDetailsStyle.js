import { StyleSheet, Platform } from "react-native";

const getGroupDetailsStyle = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        paddingHorizontal: 16,
    },

    // --- Header ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: colors.background,
    },
    iconButton: {
        padding: 8,
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    headerTitle: {
        color: colors.text,
        fontSize: 18,
        fontFamily: 'serif',
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },

    // --- Hero Card ---
    heroCard: {
        backgroundColor: colors.theme,
        borderRadius: 24,
        padding: 20,
        marginTop: 10,
        marginBottom: 16,
        shadowColor: colors.theme,
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    heroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    heroLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
        fontFamily: 'serif',
        fontWeight: '600',
        marginBottom: 4,
    },
    heroValue: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: '800',
        fontFamily: 'serif',
    },
    circularIcon: {
        backgroundColor: colors.background,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressContainer: {
        backgroundColor: colors.background,
        borderRadius: 16,
        padding: 12,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        color: colors.text,
        fontSize: 12,
        fontFamily: 'serif',
        fontWeight: '600',
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.border,
    },
    totalBudgetLabel: {
        color: colors.text,
        fontSize: 12,
        fontFamily: 'serif',
        marginTop: 8,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    descriptionContainer: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    groupTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    groupTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        fontFamily: 'serif',
    },
    description: {
        color: colors.textSecondary,
        fontSize: 14,
        fontFamily: 'serif',
    },

    // --- Sections ---
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 18,
        fontFamily: 'serif',
        fontWeight: '700',
    },
    smallBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.theme,
    },
    smallBtnText: {
        color: colors.theme,
        fontWeight: '600',
        fontSize: 12,
        fontFamily: 'serif',
        marginLeft: 4,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.theme,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        gap: 4
    },
    addButtonText: {
        color: colors.theme,
        fontWeight: '600',
        fontSize: 12,
        fontFamily: 'serif',
    },

    // --- Settlements Section (New) ---
    settlementCard: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    settlementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    settlementAvatars: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    settlementText: {
        flex: 1,
        fontSize: 14,
        color: colors.textSecondary,
        fontFamily: 'serif',
    },
    settlementHighlight: {
        fontWeight: '700',
        color: colors.text,
        fontFamily: 'serif',
    },
    settlementAmount: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.theme,
        fontFamily: 'serif',
    },

    // --- Members List ---
    listContainer: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    memberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    memberAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.theme,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.theme,
    },
    avatarLabel: {
        color: colors.theme,
        fontWeight: '700',
    },
    memberNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'space-between'
    },
    memberName: {
        color: colors.text,
        fontSize: 15,
        fontFamily: 'serif',
        fontWeight: '600',
        marginBottom: 2,
    },
    // New stats in member row
    memberStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        width: '100%',
    },
    roleText: {
        fontSize: 11,
        color: colors.textSecondary,
        fontFamily: 'serif',
    },
    adminText: {
        fontSize: 11,
        color: colors.theme,
        fontFamily: 'serif',
        fontWeight: '700',
        marginLeft: 4
    },
    balanceText: {
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'serif',
    },
    spentText: {
        fontSize: 11,
        color: colors.text,
        fontFamily: 'serif',
    },
    adminBadge: {
        backgroundColor: colors.tintedThemeColor,
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    divider: {
        backgroundColor: colors.border,
        height: 1,
    },

    // --- Expenses List ---
    expenseCard: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    expenseIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    expenseTitle: {
        color: colors.text,
        fontSize: 16,
        fontFamily: 'serif',
        fontWeight: '600',
        marginBottom: 4,
    },
    expenseSub: {
        color: colors.textSecondary,
        fontSize: 12,
        fontFamily: 'serif',
    },
    expenseAmount: {
        color: colors.text,
        fontSize: 16,
        fontFamily: 'serif',
        fontWeight: '700',
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    splitText: {
        color: colors.textSecondary,
        fontSize: 11,
        fontFamily: 'serif',
        marginTop: 2,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    emptySubText: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },

    centeredMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      centeredMessageText: {
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
        marginBottom: 20,
      },
      goBackButton: {
        backgroundColor: colors.theme,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
      },
      goBackButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      headerIconBtn: {
        padding: 5,
        backgroundColor: colors.theme,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
});

export default getGroupDetailsStyle;