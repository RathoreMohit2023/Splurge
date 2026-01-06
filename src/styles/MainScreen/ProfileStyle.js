import { StyleSheet, Platform } from "react-native";

const getProfileStyle = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background, // Dynamic Background
    },
    scrollContent: {
        paddingHorizontal: 20,
    },

    // --- Header ---
    headerContainer: {
        marginBottom: 24,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.theme,
    },
    avatar: {
        backgroundColor: colors.tintedThemeColor,
        borderWidth: 2,
        borderColor: colors.border,
    },
    avatarLabel: {
        color: colors.theme,
        fontWeight: '700',
        fontSize: 28,
        fontFamily: 'serif',
    },
    rankBadge: {
        position: 'absolute',
        bottom: -6,
        alignSelf: 'center',
        backgroundColor: colors.theme,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.background,
    },
    rankText: {
        color: "#FFFFFF", // Fixed White
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'serif',
    },
    userInfo: {
        flex: 1,
        marginLeft: 20,
    },
    userName: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 4,
        fontFamily: 'serif',
    },
    userHandle: {
        color: colors.theme,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        fontFamily: 'serif',
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    contactText: {
        color: colors.textSecondary,
        fontSize: 13,
        fontFamily: 'serif',
    },
    editButton: {
        padding: 10,
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },

    // --- Stats Grid ---
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 32,
    },
    statCard: {
        width: '48%',
        backgroundColor: colors.theme, // Always Purple
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border, // Optional: Can match theme or transparent
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statValue: {
        color: "#FFFFFF", // Fixed White
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'serif',
    },
    statLabel: {
        color: "rgba(255,255,255,0.7)", // Fixed Light Gray
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },

    // --- Menu Sections ---
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontFamily: 'serif',
    },
    menuCard: {
        backgroundColor: colors.tintedThemeColor, // Changed to Surface for better contrast
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    menuIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.theme, // Inset look
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuLabel: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'serif',
    },
    divider: {
        backgroundColor: colors.border,
        height: 1,
        marginLeft: 62, 
    },

    // --- Footer ---
    footer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    versionText: {
        color: colors.textSecondary,
        fontSize: 12,
        marginBottom: 16,
        fontFamily: 'serif',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(255, 59, 48, 0.1)", // Light Red tint usually works on both
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        gap: 8,
    },
    logoutText: {
        color: colors.error,
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'serif',
    },
});

export default getProfileStyle;