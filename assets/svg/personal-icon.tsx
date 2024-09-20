import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PersonalIcon = (props: any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.99967 10C12.3009 10 14.1663 8.13454 14.1663 5.83335C14.1663 3.53217 12.3009 1.66669 9.99967 1.66669C7.69849 1.66669 5.83301 3.53217 5.83301 5.83335C5.83301 8.13454 7.69849 10 9.99967 10Z"
      fill={props?.color || "#9CA3AF"}
    />
    <Path
      d="M9.9998 12.0833C5.8248 12.0833 2.4248 14.8833 2.4248 18.3333C2.4248 18.5666 2.60814 18.75 2.84147 18.75H17.1581C17.3915 18.75 17.5748 18.5666 17.5748 18.3333C17.5748 14.8833 14.1748 12.0833 9.9998 12.0833Z"
      fill={props?.color || "#9CA3AF"}
    />
  </Svg>
);
export default PersonalIcon;
