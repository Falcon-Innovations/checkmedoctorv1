import React, {useState, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import Navigation from './navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  useEffect(() => {
    // Check if it's the first time the app is launched
    // You can use AsyncStorage or any other storage mechanism to store and retrieve this information
    const checkFirstLaunch = async () => {
      // Simulating the retrieval of the first launch flag from storage
      const isFirstLaunchValue = await AsyncStorage.getItem('isFirstLaunch');
      setIsFirstLaunch(!isFirstLaunchValue);
    };

    checkFirstLaunch();
  }, []);

  // Simulating the authentication process
  const authenticateUser = () => {
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 2000);
  };

  // Simulating the logout process
  const logoutUser = () => {
    setIsAuthenticated(false);
  };

  // Render the navigation based on the authentication status
  return (
    <PaperProvider>
      <Navigation isAuthenticated={isAuthenticated} />
    </PaperProvider>
  );
}
