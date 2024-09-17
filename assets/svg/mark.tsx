import { deviceWidth } from "@helper/utils";
import React from "react";
import Svg, { G, Mask, Path, Rect } from "react-native-svg";

function MarkView() {
  return (
    <Svg
      width={"100%"}
      height={100}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Mask
        id="mask0_302_1956"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={deviceWidth}
        height={84}
      >
        <Rect width={400} height={84} rx={0} fill="#6A5AE0" />
      </Mask>
      <G mask="url(#mask0_302_1956)">
        <Path
          opacity={0.2}
          d="M8 2C8 2 25.3765 66.9778 59.3802 80.9533C116.137 104.28 190.682 29.2663 264.304 46.8598C323.796 61.0768 382 130 382 130"
          stroke="white"
          strokeWidth={2}
        />
        <Path
          opacity={0.2}
          d="M6.5 1C6.5 1 21.0424 55.3174 49.5 67C97 86.5 159.386 23.7929 221 38.5C270.789 50.3845 319.5 108 319.5 108"
          stroke="white"
          strokeWidth={2}
        />
      </G>
    </Svg>
  );
}

export default MarkView;
