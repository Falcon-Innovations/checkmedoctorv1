import React, {useState, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AuthProvider from './src/contexts/authContext';
import Navigation from './navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './src/lib/react-query';
QueryClientProvider

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const isFirstLaunchValue = await AsyncStorage.getItem('isFirstLaunch');
      setIsFirstLaunch(!isFirstLaunchValue);
    };

    checkFirstLaunch();
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <AuthProvider>
          <Navigation isAuthenticated={isAuthenticated} />
        </AuthProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
