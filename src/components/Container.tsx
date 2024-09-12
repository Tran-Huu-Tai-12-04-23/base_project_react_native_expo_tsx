import React from "react";
import { View } from "react-native";

function Container({
  p = 10,
  m = 0,
  bg = "transparent",
  children,
}: {
  p?: number;
  m?: number;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        padding: p,
        margin: m,
        flex: 1,
        backgroundColor: bg,
      }}
    >
      {children}
    </View>
  );
}

export default Container;
