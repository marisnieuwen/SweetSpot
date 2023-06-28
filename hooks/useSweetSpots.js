import { useState, useEffect } from "react";
import fetchSweetSpots from "../api/foursquareApi";
import useNetworkStatus from "../hooks/useNetworkStatus";

// A hook to fetch 'sweet spots' data from an API and keep it in state
export default function useSweetSpots() {
  const [sweetSpots, setSweetSpots] = useState([]);
  const isConnected = useNetworkStatus(); // Checks if device is connected to the internet

  useEffect(() => {
    // Only try to fetch data if there's an active network connection
    if (isConnected) {
      fetchSweetSpots()
        .then((spots) => setSweetSpots(spots)) // When the data is fetched successfully, update the state
        .catch((error) => console.error("Error fetching sweet spots:", error));
    }
  }, [isConnected]); // This effect hook depends on network connection status

  return sweetSpots;
}
