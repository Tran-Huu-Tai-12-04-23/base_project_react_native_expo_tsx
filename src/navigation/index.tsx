import { useAuth } from "@context/authContext";
import {
  DefaultTheme,
  NavigationContainer,
  NavigationState,
} from "@react-navigation/native";
import { AppStack } from "@screens/app/AppStack";
import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import AuthNavigator from "./AuthNavigator";
import { navigationRef } from "./NavigationService";

function screenTracking(state: NavigationState | undefined): void {
  if (state) {
    const route = state?.routes[state.index];
    if (route.state) {
      return screenTracking(route?.state as any);
    }
    return console.log(`====== NAVIGATING to > ${route?.name}`);
  }
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};
const MainNavigation = () => {
  const { loginData } = useAuth();
  return (
    <NavigationContainer
      theme={MyTheme}
      ref={navigationRef}
      onStateChange={screenTracking}
    >
      <StatusBar barStyle="dark-content" />
      {loginData && <AppStack />}
      {!loginData && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigation;
