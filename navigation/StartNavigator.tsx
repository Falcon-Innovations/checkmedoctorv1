import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../src/screens/main";
import { Onboarding } from "../src/screens/start";

export type MainRootStackParamList = {
  onBoarding: undefined;
};

const Stack = createNativeStackNavigator<MainRootStackParamList>();

const StartNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="onBoarding"
    >
      <Stack.Screen name="onBoarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default StartNavigator;
