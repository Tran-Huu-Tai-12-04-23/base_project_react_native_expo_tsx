import { deviceHeight, deviceWidth } from "@helper/utils";
import * as React from "react";
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from "react-native-svg";
const ProfileBackground = (props: any) => (
  <Svg
    width={deviceWidth}
    height={deviceHeight}
    viewBox={`0 0 ${deviceWidth}  ${deviceHeight}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_302_2258)">
      <Rect width={deviceWidth} height={deviceHeight} fill="white" />
      <Rect width={deviceWidth} height={1325} fill="#699CF4" />
      <Mask
        id="mask0_302_2258"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={deviceWidth}
        height={deviceHeight}
      >
        <Rect width={deviceWidth} height={1325} fill="#699CF4" />
      </Mask>
      <G mask="url(#mask0_302_2258)">
        <Path
          opacity={0.1}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.4375 242.25C60.3665 242.25 86.25 216.366 86.25 184.438C86.25 152.509 60.3665 126.625 28.4375 126.625C-3.49146 126.625 -29.375 152.509 -29.375 184.438C-29.375 216.366 -3.49146 242.25 28.4375 242.25Z"
          fill="#C4D0FB"
        />
        <Path
          opacity={0.2}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30 286C85.2285 286 130 241.228 130 186C130 130.772 85.2285 86 30 86C-25.2285 86 -70 130.772 -70 186C-70 241.228 -25.2285 286 30 286Z"
          stroke="#C4D0FB"
        />
        <Path
          opacity={0.1}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M330.438 69.25C362.366 69.25 388.25 43.3665 388.25 11.4375C388.25 -20.4915 362.366 -46.375 330.438 -46.375C298.509 -46.375 272.625 -20.4915 272.625 11.4375C272.625 43.3665 298.509 69.25 330.438 69.25Z"
          fill="#C4D0FB"
        />
        <Path
          opacity={0.2}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M332 113C387.228 113 432 68.2285 432 13C432 -42.2285 387.228 -87 332 -87C276.772 -87 232 -42.2285 232 13C232 68.2285 276.772 113 332 113Z"
          stroke="#C4D0FB"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M276 103C281.523 103 286 98.5228 286 93C286 87.4772 281.523 83 276 83C270.477 83 266 87.4772 266 93C266 98.5228 270.477 103 276 103Z"
          fill="#9BBDF8"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M87 112C90.866 112 94 108.866 94 105C94 101.134 90.866 98 87 98C83.134 98 80 101.134 80 105C80 108.866 83.134 112 87 112Z"
          fill="#9BBDF8"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_302_2258">
        <Rect width={deviceWidth} height={deviceHeight} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ProfileBackground;
