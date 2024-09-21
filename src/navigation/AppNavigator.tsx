import { config } from "@helper/helpers";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SettingScreen from "src/screens/Global/Profile/Setting";
import CreateQuizScreen from "src/screens/Global/Quiz/Create";
import PlayQuizScreen from "src/screens/Global/Quiz/Play";
import BottomTabNavigator from "./BottomTabNavigator";
import { verticalTransaction } from "./config/transaction.config";
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
      <Screen
        name={APP_ROUTE.SETTING}
        component={SettingScreen}
        options={
          {
            ...verticalTransaction,
          } as any
        }
      />
      <Screen
        name={APP_ROUTE.CREATE_QUIZ}
        options={
          {
            ...verticalTransaction,
          } as any
        }
        component={CreateQuizScreen}
      />
    </Navigator>
  );
};

export default AppNavigator;
