import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { useDerivedValue, withTiming } from "react-native-reanimated";
import Svg from "react-native-svg";
import AnimatedCheckMarkPath from "./AnimateCheckMarkPath";
import AnimatedColor from "./AnimateColor";

interface TypeProps {
  checked: boolean;
  label: string;
  onPress: () => void;
}
const CheckBoxItem = memo((props: TypeProps) => {
  const { checked, label, onPress } = props;
  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0);
  });

  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        start
        colGap={5}
        style={{ alignContent: "center", alignItems: "center" }}
      >
        <Svg width={normalize(15)} height={normalize(15)} viewBox="0 0 49 49">
          <AnimatedColor
            onPress={onPress}
            progress={progress}
            checkedBorderColor={theme.primary}
            unCheckedBorderColor={"transparent"}
            checkedBackgroundColor={theme.primary}
            unCheckedBackgroundColor={theme.backgroundSecond}
          />
          <AnimatedCheckMarkPath
            progress={progress}
            checkMarkColor={theme.background}
          />
        </Svg>

        <TextDefault style={{ fontSize: 12, color: theme.textSecond }}>
          {label}
        </TextDefault>
      </Row>
    </TouchableOpacity>
  );
});

export default CheckBoxItem;
