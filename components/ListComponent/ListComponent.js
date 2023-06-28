import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./ListComponent.styles";
import NoteComponent from "../NoteComponent";

import useSweetSpots from "../../hooks/useSweetSpots";
import useHandleHeartPress from "../../hooks/useHandleHeartPress";
import useNetworkStatus from "../../hooks/useNetworkStatus";

import { useFavorites } from "../../contexts/FavoritesContext";
import { ThemeContext } from "../../contexts/ThemeContext";

import { storeData } from "../../utils/storage";

const ListComponent = ({ navigation }) => {
  const { theme } = useContext(ThemeContext); // ThemeContext is used for managing dark/light mode
  const sweetSpots = useSweetSpots(); // fetch sweet spots data with custom hook
  const isConnected = useNetworkStatus(); // Checks if device is connected to the internet

  // Access favorites state and setFavorites function from FavoritesContext
  const { favorites, setFavorites } = useFavorites();

  // State for modal visibility and selected item
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to show toast messages
  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  // Fetch the handleHeartPress function for handling favorite presses
  const { handleHeartPress } = useHandleHeartPress(
    favorites,
    setFavorites,
    navigation,
    setModalVisible,
    setSelectedItem
  );

  // Navigate to the selected sweet spot location on press
  const handleItemPress = (location) => {
    console.log("Attempting to navigate to MapView with location:", location);
    try {
      navigation.navigate("MapView", { selectedLocation: location });
      console.log("Navigation attempt was made.");
    } catch (error) {
      console.log("An error occurred during navigation:", error);
    }
  };

  // Handle submission of notes
  const handleSubmit = (note) => {
    console.log("Note submitted:", note);
    handleHeartPress(selectedItem, note);
    setModalVisible(!modalVisible);
    showToast("Added to your Favorites! :)"); // Display toast when note and favorite are added
  };

  useEffect(() => {
    // Function to save favorites to AsyncStorage
    const saveFavorites = async () => {
      await storeData("favorites", favorites);
    };

    // Call the function to save favorites
    saveFavorites();
  }, [favorites]); // This useEffect hook triggers whenever 'favorites' state changes

  return (
    <SafeAreaView style={styles(theme).container}>
      {isConnected ? ( // If connected to internet show this
        <>
          <NoteComponent
            modalVisible={modalVisible}
            handleClose={() => setModalVisible(!modalVisible)}
            handleSubmit={handleSubmit}
          />
          <FlatList
            style={styles(theme).flatList}
            data={sweetSpots}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemPress(item.location)}>
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
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => handleHeartPress(item)}>
                      <MaterialIcons
                        name={
                          favorites.some((favorite) => favorite.id === item.id)
                            ? "favorite"
                            : "favorite-border"
                        }
                        style={
                          favorites.some((favorite) => favorite.id === item.id)
                            ? styles(theme).filledIcon
                            : styles(theme).icon
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        // not connected to internet show this
        <View style={styles(theme).offlineContainer}>
          <Text style={styles(theme).offlineText}>
            You are currently offline. Some features may not be available.
            Please check your network and try again.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ListComponent;
