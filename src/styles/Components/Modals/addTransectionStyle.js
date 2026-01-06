import { StyleSheet } from "react-native";

const addTransectionStyle = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        padding: 20,
      },
      modalContainer: {
        backgroundColor: "#1A1A1A",
        padding: 22,
        borderRadius: 14,
      },
    
      closeBtn: {
        alignSelf: "flex-end",
        padding: 6,
      },
    
      modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 20,
      },
    
      inputBlock: {
        marginBottom: 15,
      },
    
      inputLabel: {
        color: "#ffffff",
        fontSize: 14,
        marginBottom: 6,
      },
    
      input: {
        backgroundColor: "#25202C",
        padding: 12,
        borderRadius: 10,
        color: "#fff",
        fontSize: 16,
      },
      inputFocused: {
        borderWidth: 1.5,
        borderColor: "#7C3BEC",
      },
      
      inputWithIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      
      dropdownBox: {
        backgroundColor: "#25202C",
        marginTop: 6,
        borderRadius: 10,
        paddingVertical: 6,
      },    
      addBtn: {
        backgroundColor: "#7C3BEC",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
      },
      addBtnText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
      },
      dropdownWrapper: {
        backgroundColor: "#25202C",
        borderRadius: 10,
        marginTop: 6,
        borderWidth: 1,
        borderColor: "#7C3BEC",
        overflow: "hidden",
      },
      
      dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
      },
      
      dropdownItemText: {
        color: "#fff",
        fontSize: 16,
      },
      
});

export default addTransectionStyle;