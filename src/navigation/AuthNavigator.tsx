import { config } from "@helper/helpers";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "src/screens/Auth";
import GetStartedScreen from "src/screens/Auth/GetStarted";
import IntroScreen from "src/screens/Auth/Intro";
import { ROUTE_KEY } from "./route";
const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...config,
      }}
    >
      <Screen name={ROUTE_KEY.INTRO} component={IntroScreen} />
      <Screen name={ROUTE_KEY.GET_STARTED} component={GetStartedScreen} />
      <Screen name={ROUTE_KEY.LOGIN} component={LoginScreen} />
    </Navigator>
  );
};

export default AuthNavigator;
