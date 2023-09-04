import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';
import {useAuthContext} from '../src/contexts/authContext';
import Loader from '../components/loader';
import {navigationRef} from './RootNavigator';

export type MainRootStackParamList = {
  onBoarding: undefined;
};


const Navigation = () => {
  const {userToken, isLoading} = useAuthContext()

  if (isLoading) {
    return <Loader />
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {userToken ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
