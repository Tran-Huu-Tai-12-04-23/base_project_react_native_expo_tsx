import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchIcon = (props: any) => (
  <Svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z"
      fill={props?.color ? props.color : "#6B7280"}
    />
    <Path
      d="M21.7996 22.0001C21.6196 22.0001 21.4396 21.9301 21.3096 21.8001L19.4496 19.9401C19.1796 19.6701 19.1796 19.2301 19.4496 18.9501C19.7196 18.6801 20.1596 18.6801 20.4396 18.9501L22.2996 20.8101C22.5696 21.0801 22.5696 21.5201 22.2996 21.8001C22.1596 21.9301 21.9796 22.0001 21.7996 22.0001Z"
      fill={props?.color ? props.color : "#6B7280"}
    />
  </Svg>
);
export default SearchIcon;
