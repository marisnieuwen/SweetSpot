import { useCallback } from "react";

// This hook handles the action for pressing an item, and causes the map to animate to the item's location
const useHandleItemPress = (mapRef) => {
  const handleItemPress = useCallback(
    (location) => {
      const { latitude, longitude } = location;

      // Animate the map to the item's location
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.001, // zooms in closer
        longitudeDelta: 0.001, // zooms in closer
      });
    },
    [mapRef]
  );

  return handleItemPress;
};

export default useHandleItemPress;
