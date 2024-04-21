import React from 'react';
import { styleGlobal } from '../../../styles';
import { View, Text, Button } from 'react-native';

export default function LoginScreen() {
   return (
      <View style={styleGlobal.container}>
         <Text style={styleGlobal.title}>Hello login</Text>
      </View>
   );
}
