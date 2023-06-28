import React, { useRef, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./MapComponent.styles";

import NoteComponent from "../NoteComponent";

import { ROTTERDAM_COORDINATES } from "../../utils/constants";

import lightMapStyle from "../../assets/MapStyles/lightMapStyle.json";
import darkMapStyle from "../../assets/MapStyles/darkMapStyle.json";

import useCurrentLocation from "../../hooks/useCurrentLocation";
import useSweetSpots from "../../hooks/useSweetSpots";
import useHandleHeartPress from "../../hooks/useHandleHeartPress";
import useHandleItemPress from "../../hooks/useHandleItemPress";
import useNetworkStatus from "../../hooks/useNetworkStatus";

import { useFavorites } from "../../contexts/FavoritesContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const MapComponent = ({ navigation, selectedLocation }) => {
  const { theme } = useContext(ThemeContext); // ThemeContext is used for managing dark/light mode
  const mapRef = useRef(null);
  const isConnected = useNetworkStatus(); // Checks if device is connected to the internet

  // Fetch the current location coordinates and sweet spots using custom hooks
  const currentLocation = useCurrentLocation();
  const sweetSpots = useSweetSpots();

  // Access favorites state and setFavorites function from FavoritesContext
  const { favorites, setFavorites } = useFavorites();

  // Check if the screen is focused
  const isFocused = useIsFocused();

  // Set state for active marker and modal
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle when a location is pressed with custom hook
  const handleItemPress = useHandleItemPress(mapRef);

  //Toast functionality when users saves a favorite
  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  // Functionality when the heart icon is pressed
  const { handleHeartPress } = useHandleHeartPress(
    favorites,
    setFavorites,
    navigation,
    setModalVisible,
    setSelectedItem
  );

  // Function to handle when a note is submitted
  const handleSubmit = (note) => {
    handleHeartPress(selectedItem, note);
    setModalVisible(!modalVisible);
    showToast("Added to your Favorites! :)"); // Display toast when note and favorite are added
  };

  // Handle the case when a selected location is passed
  useEffect(() => {
    if (selectedLocation) {
      handleItemPress(selectedLocation);
    }
  }, [selectedLocation]);

  // Reset the active marker when the screen is focused
  useEffect(() => {
    if (isFocused) {
      setActiveMarkerId(null);
    }
  }, [isFocused]);

  // Function to handle when the current location button is pressed
  const handleCurrentLocationPress = () => {
    if (currentLocation) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06,
      });
    }
  };

  // Function to check if a spot is already a favorite
  //TODO: Make heart icon change directly after user adds to favorite
  const isFavorite = (spot) => {
    return favorites.some((favorite) => favorite.id === spot.id);
  };

  return (
    <View style={styles(theme).container}>
      {isConnected ? ( // If connected to internet show this
        <>
          <NoteComponent
            modalVisible={modalVisible}
            handleClose={() => setModalVisible(!modalVisible)}
            handleSubmit={handleSubmit}
          />
          <MapView
            ref={mapRef}
            style={styles(theme).map}
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={theme.isDark ? darkMapStyle : lightMapStyle} // custom map for light and dark mode
            initialRegion={{
              latitude: ROTTERDAM_COORDINATES.latitude,
              longitude: ROTTERDAM_COORDINATES.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {currentLocation && (
              <Marker
                coordinate={currentLocation}
                title="Current Location"
                pinColor={"#FFEA80"}
              />
            )}
            {sweetSpots.map((spot) => (
              <Marker
                key={spot.id}
                coordinate={spot.location}
                title={spot.name}
                pinColor={
                  activeMarkerId === spot.id && isFocused
                    ? "#F99BDD"
                    : "#A4D9F7"
                }
                onPress={() => setActiveMarkerId(spot.id)}
              >
                <Callout onPress={() => handleHeartPress(spot)}>
                  <View style={styles(theme).calloutContainer}>
                    <MaterialIcons
                      name={isFavorite(spot) ? "favorite" : "favorite-border"}
                      color={isFavorite(spot) ? "#F99BDD" : "#222A33"}
                      style={styles(theme).icon}
                    />
                    <Text style={styles(theme).spotName}>{spot.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <TouchableOpacity
            style={styles(theme).currentLocationButton}
            onPress={handleCurrentLocationPress}
          >
            <MaterialIcons
              name="my-location"
              style={styles(theme).currentLocationIcon}
            />
          </TouchableOpacity>
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
    </View>
  );
};

export default MapComponent;
