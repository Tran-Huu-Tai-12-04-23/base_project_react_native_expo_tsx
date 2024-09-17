import { normalize } from "@helper/helpers";
import { deviceWidth } from "@helper/utils";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

function EffectBackgroundView() {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["transparent", "rgba(0,0,0,0.6)"]}
      style={{
        height: normalize(deviceWidth * 0.8),
        width: deviceWidth,
        transform: [{ translateY: 30 }],
        borderRadius: 10,
        position: "absolute",
        bottom: 0,
      }}
    />
  );
}

export default EffectBackgroundView;
