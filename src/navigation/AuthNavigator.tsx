import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "@screens/auth/SignInScreen";
import React from "react";
import { ROUTE_KEY } from "./route";
const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_KEY.INTRO}
    >
      <Screen name={ROUTE_KEY.LOGIN} component={SignInScreen} />
    </Navigator>
  );
};

export default AuthNavigator;
