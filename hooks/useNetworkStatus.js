import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

// This hook handles checking of network status with a library
const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    // Subscribe to network status updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      // Unsubscribe to the network status event on cleanup
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useNetworkStatus;
