import * as React from "react";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Mask,
  Path,
  Rect,
} from "react-native-svg";
const QuizIcon = (props: any) => (
  <Svg
    width={props?.size || 88}
    height={props?.size || 88}
    viewBox="0 0 88 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M41.9929 1.16429C43.2341 0.444285 44.7659 0.444285 46.0071 1.16429L63.03 11.0391L80.0933 20.8439C81.3374 21.5589 82.1033 22.8854 82.1004 24.3203L82.06 44L82.1004 63.6797C82.1033 65.1146 81.3374 66.4411 80.0933 67.1561L63.03 76.9609L46.0071 86.8357C44.7659 87.5557 43.2341 87.5557 41.9929 86.8357L24.97 76.9609L7.90674 67.1561C6.66259 66.4411 5.8967 65.1146 5.89964 63.6797L5.94 44L5.89964 24.3203C5.8967 22.8854 6.66259 21.5589 7.90674 20.8439L24.97 11.0391L41.9929 1.16429Z"
      fill="#FFD6DD"
    />
    <Mask
      id="mask0_302_2409"
      maskUnits="userSpaceOnUse"
      x={5}
      y={0}
      width={78}
      height={88}
    >
      <Path
        d="M41.9929 1.16429C43.2341 0.444285 44.7659 0.444285 46.0071 1.16429L63.03 11.0391L80.0933 20.8439C81.3374 21.5589 82.1033 22.8854 82.1004 24.3203L82.06 44L82.1004 63.6797C82.1033 65.1146 81.3374 66.4411 80.0933 67.1561L63.03 76.9609L46.0071 86.8357C44.7659 87.5557 43.2341 87.5557 41.9929 86.8357L24.97 76.9609L7.90674 67.1561C6.66259 66.4411 5.8967 65.1146 5.89964 63.6797L5.94 44L5.89964 24.3203C5.8967 22.8854 6.66259 21.5589 7.90674 20.8439L24.97 11.0391L41.9929 1.16429Z"
        fill="#FF8FA2"
      />
    </Mask>
    <G mask="url(#mask0_302_2409)">
      <Circle cx={44} cy={88} r={44} fill="#FCF2F2" />
    </G>
    <Circle
      cx={44}
      cy={44}
      r={23.5}
      fill="#FF8FA2"
      stroke="#FF6B84"
      strokeWidth={3}
    />
    <G clipPath="url(#clip0_302_2409)">
      <Path
        d="M48.6666 34.6667V41.6667M44 34.6667V38.1667V34.6667ZM39.3333 34.6667V41.6667V34.6667Z"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M44 51.5833L40.5 53.3333L41.0833 49.2499L38.75 46.9166L42.25 46.3333L44 42.8333L45.75 46.3333L49.25 46.9166L46.9167 49.2499L47.5 53.3333L44 51.5833Z"
        fill="white"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_302_2409">
        <Rect
          width={28}
          height={28}
          fill="white"
          transform="translate(30 30)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default QuizIcon;
