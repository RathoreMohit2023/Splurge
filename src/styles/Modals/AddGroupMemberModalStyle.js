import { StyleSheet } from "react-native";

const getAddGroupMemberModalStyle = (colors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.surface, // Dynamic: White / Dark Grey
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text, // Dynamic Text
    marginBottom: 4,
    fontFamily : 'serif',
  },
  subtitle: {
    fontSize: 13,
    fontFamily : 'serif',
    color: colors.textSecondary,
  },
  closeBtn: {
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontFamily : 'serif',
    fontWeight: "600",
    color: colors.text,
    marginBottom: 10,
    marginLeft: 4,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background, // Inset look
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectorError: {
    borderColor: colors.error,
  },
  selectorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.tintedThemeColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  selectorText: {
    fontSize: 16,
    fontFamily : 'serif',
    color: colors.text,
    fontWeight: "500",
  },
  placeholderText: {
    color: colors.textDisabled || colors.placeholder,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    fontFamily : 'serif',
    marginTop: 6,
    marginLeft: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelText: {
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 13,
    fontFamily : 'serif',
  },
  addBtn: {
    flex: 1.5,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: colors.theme,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addBtnText: {
    color: "#FFF", // Button text usually white
    fontWeight: "700",
    fontSize: 13,
    fontFamily : 'serif',
  },
  // Yeh styles aap apni getAddGroupMemberModalStyle function ke andar add karein

chipDisplayContainer: {
  marginTop: 12,
  maxHeight: 70, // Container ki max height set karein
},
chip: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.tintedThemeColor,
  borderRadius: 16,
  paddingVertical: 6,
  paddingHorizontal: 12,
  marginRight: 8,
  marginBottom: 8, // Thoda sa neeche margin agar chips wrap hon
  borderWidth: 1,
  borderColor: colors.theme,
},
chipText: {
  color: colors.theme,
  fontSize: 14,
  marginRight: 6,
  fontFamily: 'serif',
  fontWeight: '600',
},
});

export default getAddGroupMemberModalStyle;