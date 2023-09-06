import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Onboarding} from '../src/screens/start';

import {
  Login,
  ForgotPassword,
  ResetPassword,
  PersonalDetails,
  ProfessionalDetails,
  ImageUpload,
  OTPVerification,
  RegistrationConfirmation,
} from '../src/screens/auth';
import useGetOnboardingStatus from '../hooks/useOnboardingStatus';

export type RootStackParamList = {
  Login: undefined;
  PersonalDetails: undefined;
  ForgotPassword: undefined;
  ProfessionalDetails: undefined;
  ResetPassword: undefined;
  ImageUpload: undefined;
  onBoarding: undefined;
  OTPVerification: undefined;
  RegistrationConfirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigation = () => {
  const {isFirstLaunch, isLoading} = useGetOnboardingStatus();

  if (isLoading) {
    return null;
  }


  return (
    <Stack.Navigator
      initialRouteName="onBoarding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="onBoarding" component={Onboarding} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="ProfessionalDetails"
        component={ProfessionalDetails}
      />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
      <Stack.Screen
        name="RegistrationConfirmation"
        component={RegistrationConfirmation}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
