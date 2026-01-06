import React, { createContext, useState, useMemo } from "react";
import Colors from "../Assets/theme/color";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeType, setThemeType] = useState("light"); 

  const toggleTheme = () => {
    setThemeType((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({
    themeType,
    toggleTheme,
    colors: Colors[themeType],
  }), [themeType]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};