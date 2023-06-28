import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

// Import the ThemeContext
import { ThemeContext } from "../contexts/ThemeContext";

const SettingsComponent = () => {
  // Extract the necessary values from the ThemeContext
  const { isDark, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textcolor }]}>Settings</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.textcolor }]}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDark}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
  },
});

export default SettingsComponent;
