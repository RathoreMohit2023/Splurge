const commonColors = {
  primary: "#6200ee",
  theme: "#7015EEFF",
  error: "#cf6679",
  // success: "#00e676",
  success: "#007A2A",
  // warning: "#ffb74d",
  warning: "#B89600",
  info: "#29b6f6",
  white: "#FFFFFFFF",
  black: "#000000",
  blue : "#0000FF",

  // 🔵 Basic Shades
  red: "#FF0000",
  lowRed: "#FF00008F",
  green: "#00FF00",
  yellow: "#FFFF00",
  orange: "#FFA500",
  purple: "#800080",
  pink: "#FF69B4",
  teal: "#008080",
  cyan: "#00FFFF",

  // 🔥 Neutral & UI Grays
  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#EEEEEE",
  gray300: "#E0E0E0",
  gray400: "#BDBDBD",
  gray500: "#9E9E9E",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",

  // 🎨 Branding / Utility Colors
  lightPrimary: "#BB86FC",
  darkPrimary: "#3700B3",

  lightTheme: "#A06CFFFF",
  darkTheme: "#4B0FADFF",

  overlayDark: "rgba(0,0,0,0.5)",
  overlayLight: "rgba(255,255,255,0.5)",

  border: "#E5E7EB",
  mutedText: "#6B7280",

  // 🌈 Pastel Colors
  pastelBlue: "#AEC6CF",
  pastelGreen: "#77DD77",
  pastelPink: "#FFB7CE",
  pastelPurple: "#C3B1E1",
  pastelYellow: "#FDFD96",

  // 🧊 Transparent Variants
  transparent: "transparent",
  white50: "rgba(255,255,255,0.5)",
  black50: "rgba(0,0,0,0.5)",
};

const Colors = {
  light: {
    ...commonColors,
    background: "#F4F6F9",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    text: "#121212",
    textSecondary: "#666666",
    textDisabled: "#9e9e9e",
    border: "#B3B3B3FF",
    separator: "#F0F0F0",
    tintedThemeColor: "rgba(112, 21, 238, 0.10)",
    iconDefault: "#333333",
    shadow: "#000",
  },
  dark: {
    ...commonColors,
    background: "#080808",
    surface: "#1e1e1e",
    card: "#111111FF",
    text: "#ffffff",
    textSecondary: "#b0b0b0",
    textDisabled: "#6e6e6e",
    border: "#333333",
    separator: "#252525",
    tintedThemeColor: "rgba(124, 59, 236, 0.10)",
    iconDefault: "#ffffff",
    shadow: "#000",
  },
};

export default Colors;