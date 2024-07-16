import { Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";
import { config } from "@helper/helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import HomeScreen from "src/screens/BottomTab/Home";
import NotificationScreen from "src/screens/BottomTab/Notification";
import ProfileScreen from "src/screens/BottomTab/Profile";
import TaskScreen from "src/screens/BottomTab/Task";
import { BOTTOM_TAB_ROUTE } from "./route";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          height: Platform.OS == "android" ? 60 : 80,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        ...config,
      }}
    >
      <Screen
        name={BOTTOM_TAB_ROUTE.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name={BOTTOM_TAB_ROUTE.TASK}
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="tasks" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name={BOTTOM_TAB_ROUTE.NOTIFICATION}
        component={NotificationScreen}
        options={{
          tabBarBadge: 3,
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="bell-alt" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name={BOTTOM_TAB_ROUTE.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export default BottomTabNavigator;
