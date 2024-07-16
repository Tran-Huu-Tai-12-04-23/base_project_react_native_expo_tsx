import { config } from "@helper/helpers";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "src/screens/Auth";
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
      initialRouteName={ROUTE_KEY.INTRO}
    >
      <Screen name={ROUTE_KEY.INTRO} component={IntroScreen} />
      <Screen name={ROUTE_KEY.LOGIN} component={LoginScreen} />
    </Navigator>
  );
};

export default AuthNavigator;
