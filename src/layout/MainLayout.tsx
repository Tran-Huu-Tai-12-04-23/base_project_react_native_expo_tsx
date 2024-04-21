import React from 'react';
import { View } from 'react-native';
import { styleGlobal } from 'src/styles';

type PropsType = {
   children: React.ReactNode;
};
function MainLayout({ children }: PropsType) {
   return <View style={styleGlobal.container}>{children}</View>;
}

export default MainLayout;
