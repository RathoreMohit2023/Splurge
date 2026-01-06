import { StyleSheet } from "react-native";

const getCalculatorStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: colors.background,
    // Optional: Add top padding for Android if not using SafeAreaView inside
    paddingTop: 10, 
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text, // Dynamic Text
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary, // Dynamic Secondary Text
    marginTop: 4,
    fontFamily: 'serif',
  },
});

export default getCalculatorStyles;