import React, { createContext, useState } from "react";

// Create a new context for the theme settings
export const ThemeContext = createContext();

// Provide the theme context to the children components
export const ThemeProvider = ({ children }) => {
  // Initialize the state for the dark mode setting
  const [isDark, setIsDark] = useState(false);

  // Function to toggle dark mode
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Define the current theme based on the isDark state
  const theme = isDark ? { ...darkTheme, isDark } : { ...lightTheme, isDark };

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const lightTheme = {
  background: "#FCFCFC",
  card: "#EAF6FD",
  InactiveBackgroundColor: "#ffffff",
  mainblue: "#A4D9F7",
  pink: "#F99BDD",
  textInputBackground: "#F2F2F2",
  textcolor: "#222A33",
  notecolor: "#FFFFFF",
  currentLocationIcon: "#FFFFFF",
  placeholderColor: "#BDBDBD",
};

const darkTheme = {
  background: "#2F2F2F",
  card: "#404040",
  InactiveBackgroundColor: "#242424",
  mainblue: "#A4D9F7",
  pink: "#F99BDD",
  textInputBackground: "#131313",
  textcolor: "#FCFCFC",
  notecolor: "#242424",
  currentLocationIcon: "#222A33",
  placeholderColor: "#787878",
};
