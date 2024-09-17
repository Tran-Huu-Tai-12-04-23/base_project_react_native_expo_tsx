import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AddIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9 9H1M9 1V9V1ZM9 9V17V9ZM9 9H17H9Z"
      stroke={props?.color ? props.color : "white"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AddIcon;
