import { useTheme } from "@context/themContext";
import React from "react";
import { SafeAreaView } from "react-native";
import { styleGlobal } from "src/styles";

type PropsType = {
  children: React.ReactNode;
};
function MainLayout({ children }: PropsType) {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[styleGlobal.container, { backgroundColor: theme.background }]}
    >
      {children}
    </SafeAreaView>
  );
}

export default MainLayout;
