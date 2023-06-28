import { useContext } from "react";
import { useFavorites } from "../contexts/FavoritesContext";

// This hook handles the action for pressing the heart icon
const useHandleHeartPress = (
  favorites,
  setFavorites,
  navigation,
  setModalVisible,
  setSelectedItem
) => {
  const handleHeartPress = (item, note = null) => {
    // Check if the item is already a favorite
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    if (isFavorite) {
      // Remove from favorites if it already is a favorite
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== item.id)
      );
    } else {
      // Set the item as the selected item and open the modal (note) if it is not a favorite
      setSelectedItem(item);
      setModalVisible(true);
    }

    //TODO: Make note not a requirement when adding a new favorite
    // Add the item to favorites with a note if a note is provided
    if (note) {
      setFavorites((prevFavorites) => [...prevFavorites, { ...item, note }]);
    }
  };

  return { handleHeartPress };
};

export default useHandleHeartPress;
