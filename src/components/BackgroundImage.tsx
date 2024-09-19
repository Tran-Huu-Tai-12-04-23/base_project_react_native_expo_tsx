import React from "react";
import { View } from "react-native";

function BackgroundImage({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {children}
    </View>
  );
}

export default BackgroundImage;
