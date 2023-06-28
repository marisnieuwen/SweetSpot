// Import API Key from environment variables
import { API_KEY } from "@env";

// Assign API key from environment variables to apiKey
const apiKey = API_KEY;

// Define an async function to fetch sweet spots
const fetchSweetSpots = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };

    // The API URL for fetching sweet spots data. Filtering by categories and location.
    const apiUrl =
      "https://api.foursquare.com/v3/places/search?categories=13040,13041,13042,13043,13047,13048,13063,13392&near=Rotterdam,NL";

    // Make the fetch request and await the response
    const response = await fetch(apiUrl, options);
    // Parse the response as JSON
    const data = await response.json();

    // Check if the data has results and if the length of results is greater than 0
    if (data?.results?.length > 0) {
      const spots = data.results.map((item) => ({
        id: item.fsq_id, // Use foursquare id as id
        name: item.name,
        location: {
          latitude: item.geocodes.main.latitude,
          longitude: item.geocodes.main.longitude,
          address: item.location.address, // formatted_address gives postcode and city if needed
        },
      }));
      // Return the transformed spots data
      return spots;
    } else {
      // If there are no results, throw an error

      throw new Error("No sweet spots found.");
    }
  } catch (error) {
    // If any errors occurred during the fetch request or data transformation, log the error and throw it
    console.error("Error fetching sweet spots:", error);
    throw error;
  }
};

export default fetchSweetSpots;
