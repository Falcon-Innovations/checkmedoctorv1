import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../src/screens/main';

export type MainRootStackParamList = {
  Home: undefined;
  onBoarding: undefined;
};

const Stack = createNativeStackNavigator<MainRootStackParamList>();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
