import { config } from "@helper/helpers";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PlayQuizScreen from "src/screens/Global/Quiz/Play";
import BottomTabNavigator from "./BottomTabNavigator";
import { APP_ROUTE } from "./route";
const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...config,
      }}
      initialRouteName="BOTTOM_TAB"
    >
      <Screen name={"BOTTOM_TAB"} component={BottomTabNavigator} />
      <Screen name={APP_ROUTE.QUIZ_PLAY} component={PlayQuizScreen} />
    </Navigator>
  );
};

export default AppNavigator;
