import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";
import { View } from "react-native";
import { styleGlobal } from "src/styles";

type PropsType = {
  children: React.ReactNode;
};
function MainLayout({ children }: PropsType) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styleGlobal.container,
        { backgroundColor: theme.background, paddingTop: normalize(45) },
      ]}
    >
      {children}
    </View>
  );
}

export default MainLayout;
