import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
const FindFriendIcon = (props: any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_2325_138)">
      <Path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke={props?.color || "#6A5AE0"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 17.5V17.5083"
        stroke={props?.color || "#6A5AE0"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 7.5V7.50833"
        stroke={props?.color || "#6A5AE0"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 7.5V7.50833"
        stroke={props?.color || "#6A5AE0"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66667 16.7499C5.52945 16.1952 4.55105 15.3619 3.82253 14.3274C3.09401 13.2929 2.63905 12.0909 2.5 10.8333"
        stroke={props?.color || "#6A5AE0"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3334 16.7499C14.4706 16.1952 15.449 15.3619 16.1775 14.3274C16.906 13.2929 17.361 12.0909 17.5 10.8333"
        stroke={props?.color || "#6A5AE0"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.16663 4.16661C6.5067 3.06991 8.18499 2.4707 9.91663 2.4707C11.6483 2.4707 13.3266 3.06991 14.6666 4.16661"
        stroke={props?.color || "#6A5AE0"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2325_138">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default FindFriendIcon;
