import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Text, StyleSheet } from "react-native";

import MapView from "../screens/MapView";
import SpotsList from "../screens/SpotsList";
import Settings from "../screens/Settings";
import Favorites from "../screens/Favorites";

import { ThemeContext } from "../contexts/ThemeContext";

const Tab = createBottomTabNavigator();

//Using styles as a prop, so it can access
function LogoTitle({ styles }) {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoImage}
        source={require("../assets/LogoSweetSpot.png")}
      />
    </View>
  );
}

function MyTabs() {
  const { theme } = useContext(ThemeContext); // Access to theme context

  // Stylesheet in component, so theme can be accessed
  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme.mainblue,
    },
    logoContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    logoImage: {
      width: 64,
      height: 64,
      resizeMode: "contain",
      alignSelf: "center",
      flex: 1,
    },
    tabBarIconContainer: {
      alignItems: "center",
      justifyContent: "center",
      top: 10,
    },
    tabBarIcon: {
      width: 25,
      height: 25,
    },
    tabBarLabel: {
      fontSize: 12,
    },
    tabBarStyle: {
      position: "absolute",
      bottom: 15,
      left: 20,
      right: 20,
      elevation: 0,
      borderRadius: 15,
      height: 60,
      overflow: "hidden",
      borderTopWidth: 0, // Add this line
      borderTopColor: "transparent", // Add this line
    },
    tabBarLabelText: {
      color: theme.textcolor,
      fontSize: 12,
      fontWeight: "normal",
    },
    tabBarLabelFocusedText: {
      color: "#222A33",
      fontSize: 12,
      fontWeight: "bold",
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="MapView"
      screenOptions={({ route }) => ({
        headerTitle: (props) => <LogoTitle {...props} styles={styles} />,
        headerTitleAlign: "center",
        headerStyle: styles.header,
        tabBarLabel: "",
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let label;
          switch (route.name) {
            case "MapView":
              iconSource = require("../assets/Map.png");
              label = "Map";
              break;
            case "SpotsList":
              iconSource = require("../assets/Spots.png");
              label = "Spots";
              break;
            case "Favorites":
              iconSource = require("../assets/Heart.png");
              label = "Favorites";
              break;
            case "Settings":
              iconSource = require("../assets/Settings.png");
              label = "Settings";
              break;
            default:
              break;
          }

          return (
            <View style={styles.tabBarIconContainer}>
              <Image
                source={iconSource}
                resizeMode="contain"
                style={styles.tabBarIcon}
              />
              <Text
                style={
                  focused
                    ? styles.tabBarLabelFocusedText
                    : styles.tabBarLabelText
                }
              >
                {label}
              </Text>
            </View>
          );
        },
        tabBarActiveBackgroundColor: "#A4D9F7",
        tabBarInactiveBackgroundColor: theme.InactiveBackgroundColor,
      })}
    >
      <Tab.Screen name="MapView" component={MapView} />
      <Tab.Screen name="SpotsList" component={SpotsList} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default MyTabs;
