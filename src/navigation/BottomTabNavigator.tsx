import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ROUTE_KEY } from './route';
import { config } from '@helper/helpers';
import { LoginScreen } from 'src/screens/Auth';
import IntroScreen from 'src/screens/Auth/Intro';
import { Platform } from 'react-native';
import HomeScreen from 'src/screens/BottomTab/Home';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNavigator = () => {
   return (
      <Navigator
         screenOptions={{
            tabBarStyle: {
               backgroundColor: 'white',
               height: Platform.OS == 'android' ? 80 : 100,
            },
            headerShown: false,
            ...config,
         }}
      >
         <Screen
            name={ROUTE_KEY.HOME}
            component={HomeScreen}
            options={{
               tabBarLabel: 'Home',
               // tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
            }}
         />
      </Navigator>
   );
};

export default BottomTabNavigator;
