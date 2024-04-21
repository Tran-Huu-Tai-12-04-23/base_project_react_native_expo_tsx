import { styleGlobal } from '../../../styles';
import { View, Text, Button } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '@context/authContext';

export default function IntroScreen() {
   const { login } = useAuth();
   return (
      <View style={styleGlobal.container}>
         <Text style={styleGlobal.title}>Hello login</Text>
         <TouchableOpacity onPress={() => login({ user: true })}>
            <Button title="Login"></Button>
         </TouchableOpacity>
      </View>
   );
}
