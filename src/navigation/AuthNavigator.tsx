import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ROUTE_KEY } from './route';
import { config } from '@helper/helpers';
import { LoginScreen } from 'src/screens/Auth';
import IntroScreen from 'src/screens/Auth/Intro';
const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => {
   return (
      <Navigator
         screenOptions={{
            headerShown: false,
            ...config, // Assuming config contains additional options for screens
         }}
      >
         <Screen name={ROUTE_KEY.INTRO} component={IntroScreen} />
         <Screen name={ROUTE_KEY.LOGIN} component={LoginScreen} />
      </Navigator>
   );
};

export default AuthNavigator;
