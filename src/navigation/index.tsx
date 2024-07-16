import { useAuth } from "@context/authContext";
import {
  DefaultTheme,
  NavigationContainer,
  NavigationState,
} from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
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
  const { user } = useAuth();
  return (
    <NavigationContainer
      theme={MyTheme}
      ref={navigationRef}
      onStateChange={screenTracking}
    >
      <StatusBar barStyle="dark-content" />
      {user && <BottomTabNavigator />}
      {!user && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigation;
