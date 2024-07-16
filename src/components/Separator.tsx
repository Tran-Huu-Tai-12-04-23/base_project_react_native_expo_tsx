import React from "react";
import { View } from "react-native";
import { styleGlobal } from "src/styles";

function Separator({ height, style }: { height: number; style?: any }) {
  return <View style={[styleGlobal.separator, { height: height, ...style }]} />;
}

export default Separator;
