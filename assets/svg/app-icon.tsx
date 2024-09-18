import { normalize } from "@helper/helpers";
import * as React from "react";
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";
const AppIcon = (props: any) => (
  <Svg
    width={normalize(80)}
    height={normalize(80)}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0 20C0 8.95431 8.95431 0 20 0H100C111.046 0 120 8.95431 120 20V100C120 111.046 111.046 120 100 120H20C8.95431 120 0 111.046 0 100V20Z"
      fill="white"
    />
    <Rect
      x={6}
      y={6}
      width={108}
      height={108}
      rx={54}
      fill="url(#paint0_linear_2108_19592)"
    />
    <Rect
      width={11}
      height={40}
      rx={5.5}
      transform="matrix(-0.866025 0.5 0.5 0.866025 55.8008 42)"
      fill="white"
    />
    <Rect
      width={11}
      height={40}
      rx={5.5}
      transform="matrix(-0.866025 0.5 0.5 0.866025 33.5264 42)"
      fill="white"
    />
    <Rect
      width={11}
      height={40}
      rx={5.5}
      transform="matrix(-0.866025 0.5 0.5 0.866025 75.8008 42)"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2108_19592"
        x1={60}
        y1={6}
        x2={60}
        y2={114}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1AA5F7" />
        <Stop offset={1} stopColor="#1D79F7" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default AppIcon;
