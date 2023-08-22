import {NavigationContainer} from '@react-navigation/native';
import {View, Text, ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';
import {Onboarding} from '../src/screens/start';

export type MainRootStackParamList = {
  onBoarding: undefined;
};

const Stack = createNativeStackNavigator<MainRootStackParamList>();

const Navigation = ({isAuthenticated}: {isAuthenticated: boolean}) => {
  return (
    <NavigationContainer>
      {/* {isFirstLaunch ? (
        <Stack.Navigator>
          <Stack.Screen
            name="onBoarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : isAuthenticated ? (
        <MainNavigation />
      ) : (
        <AuthNavigation />
      )} */}

      {isAuthenticated ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
