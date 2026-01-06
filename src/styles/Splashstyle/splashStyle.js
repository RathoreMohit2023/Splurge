import { StyleSheet } from "react-native";

const getSplashStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background, // Dynamic Background (Dark: #080808, Light: #F4F6F9)
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200, 
        height: 200,
        marginBottom: 20,
    },
    tagline: {
        fontSize: 18,
        color: colors.theme,
        fontWeight: "bold",
        letterSpacing: 1.2,
        textAlign: "center",
        fontFamily: 'serif',
    },
});

export default getSplashStyles;