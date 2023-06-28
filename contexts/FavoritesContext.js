import React, { createContext, useState, useEffect, useContext } from "react";
import { storeData, getData } from "../utils/storage";

// Create FavoritesContext to manage shared state related to favorites across all screens
const FavoritesContext = createContext();

// Custom hook to consume FavoritesContext and access favorites state and setFavorites function
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// Provide the favorites context to the children components
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from storage on component mount
  useEffect(() => {
    (async () => {
      const savedFavorites = await getData("favorites");

      if (savedFavorites) {
        setFavorites(savedFavorites);
      }
    })();
  }, []);

  // Render the FavoritesContext.Provider component and pass the value object
  useEffect(() => {
    storeData("favorites", favorites);
  }, [favorites]);

  // Value object to be provided to consuming components
  const value = {
    favorites,
    setFavorites,
  };

  // Render FavoritesContext.Provider and pass the value
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
