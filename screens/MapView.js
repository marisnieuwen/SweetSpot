import React from "react";
// import { Text, View } from "react-native";
import MapComponent from "../components/MapComponent/MapComponent";

export default function MapView({ navigation, route }) {
  const selectedLocation = route.params ? route.params.selectedLocation : null;
  return (
    <MapComponent navigation={navigation} selectedLocation={selectedLocation} />
  );
}
