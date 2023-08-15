import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Login,ForgotPassword,ResetPassword, personalDetails } from '../screens/auth';

export type RootStackParamList = {
  Login: undefined;
  PersonalDetails: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  onBoarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigation = () => {


  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PersonalDetails" component={personalDetails} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

