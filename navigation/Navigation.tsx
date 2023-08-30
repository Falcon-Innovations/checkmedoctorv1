import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import { useAuthContext } from "../src/contexts/authContext";
import Loader from "../components/loader";
import { Onboarding } from "../src/screens/start";
import StartNavigator from "./StartNavigator";

export type MainRootStackParamList = {
  onBoarding: undefined;
};

const Stack = createNativeStackNavigator<MainRootStackParamList>();

const Navigation = ({ isFirstLaunch }: { isFirstLaunch: boolean }) => {
  const { userToken, isLoading } = useAuthContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <StartNavigator />
      ) : (
        <>{userToken ? <MainNavigation /> : <AuthNavigation />}</>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
