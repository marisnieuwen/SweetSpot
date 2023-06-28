import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Import context providers
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import BottomBarNav from "./navigators/BottomBarNavigator";

export default function App() {
  return (
    // Wrap the application with the ThemeProvider and FavoritesProvider, so Theme and Favorites are shared across all screens
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <BottomBarNav />
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
