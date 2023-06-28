import { StyleSheet } from "react-native";

const MapStyle = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    calloutContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 5,
      fontSize: 32,
    },
    map: {
      flex: 1,
    },
    spotName: {
      fontSize: 12,
      color: theme.text,
      fontWeight: "bold",
    },
    currentLocationButton: {
      position: "absolute",
      bottom: 85,
      right: 20,
      backgroundColor: theme.textcolor,
      borderRadius: 16,
      padding: 8,
    },
    currentLocationIcon: {
      fontSize: 28,
      color: theme.currentLocationIcon,
    },
    offlineText: {
      textAlign: "center",
      marginTop: "50%",
      fontSize: 18,
      color: theme.textcolor,
    },
    offlineContainer: {
      flex: 1,
      alignSelf: "center",
      width: "80%",
    },
  });

export default MapStyle;
