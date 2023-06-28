import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./FavoriteListComponent.styles";

import { useFavorites } from "../../contexts/FavoritesContext";
import { ThemeContext } from "../../contexts/ThemeContext";

import { getData } from "../../utils/storage";
import { storeData } from "../../utils/storage";

const FavoriteListComponent = ({ navigation }) => {
  // Access theme from ThemeContext
  const { theme } = useContext(ThemeContext);
  // Access favorites state and setFavorites function from FavoritesContext
  const { favorites, setFavorites } = useFavorites();

  // Check if the screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Load favorites from storage when the screen is focused
      getFavorites();
    }
  }, [isFocused]);

  // Retrieve favorites from storage and update the state
  const getFavorites = async () => {
    const savedFavorites = await getData("favorites");
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  };

  useEffect(() => {
    // Function to save favorites to AsyncStorage
    const saveFavorites = async () => {
      await storeData("favorites", favorites);
    };

    // Call the function to save favorites
    saveFavorites();
  }, [favorites]); // Triggers whenever 'favorites' state changes

  // Navigate to the selected favorite location on press
  const handleFavoritePress = (location) => {
    navigation.navigate("MapView", { selectedLocation: location });
  };

  // Remove the favorite item from the favorites list
  const handleDeleteFavorite = (item) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== item.id
    );
    setFavorites(updatedFavorites);
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <FlatList
        style={styles(theme).flatList}
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFavoritePress(item.location)}>
            <View style={styles(theme).card}>
              <View style={styles(theme).row}>
                <View style={styles(theme).leftContainer}>
                  <Image
                    source={require("../../assets/Marker.png")}
                    style={styles(theme).image}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={styles(theme).text}>{item.name}</Text>
                    <Text style={styles(theme).addresstext}>
                      {item.location.address}
                    </Text>
                    {item.note && (
                      <View style={styles(theme).noteContainer}>
                        <Text style={styles(theme).notetitle}>
                          Your Sprinkled Thoughts:
                        </Text>
                        <Text style={styles(theme).notetext}>{item.note}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleDeleteFavorite(item)}>
                  <MaterialIcons
                    name={
                      favorites.some((favorite) => favorite.id === item.id)
                        ? "favorite"
                        : "favorite-border"
                    }
                    style={styles(theme).icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default FavoriteListComponent;
