import { useState, useEffect } from "react";
import * as Location from "expo-location";

// This hook handles the retrieval of the user's current location
export default function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      // Attempt to get the user's current location
      try {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        setCurrentLocation({ latitude, longitude });
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    const requestLocationPermission = async () => {
      // Request location permission from the user
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission denied");
          return;
        }

        // Get the user's location once permission is granted
        getCurrentLocation();
      } catch (error) {
        console.log("Error requesting location permission:", error);
      }
    };

    // Execute the permission request function
    requestLocationPermission();
  }, []);

  return currentLocation;
}
