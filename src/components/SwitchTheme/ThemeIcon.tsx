import { useTheme } from "@context/themContext";
import { ETheme, useThemeUtil } from "@context/useThemUtil";
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Mask,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const RADIUS = 70;

const ThemeIcon = () => {
  const { theme, themeName, onSaveThem } = useTheme();
  const { onGetSystemTheme } = useThemeUtil();
  const gradientColor1 = useSharedValue("#ff4467");
  const gradientColor2 = useSharedValue("#ff8e0b");
  const mask = useSharedValue(0);
  const cy = useSharedValue(0);

  const colors = useDerivedValue(() => {
    return [gradientColor1.value, gradientColor2.value];
  });

  useEffect(() => {
    const handleChangeLightTheme = () => {
      cy.value = withTiming(0);
      mask.value = withTiming(0);
      gradientColor1.value = withTiming("#ff4467");
      gradientColor2.value = withTiming("#ff8e0b");
    };
    const handleChangeDarkTheme = () => {
      cy.value = withSpring(RADIUS / 2, { duration: 2000 });
      mask.value = withSpring(RADIUS, { duration: 2000 });
      gradientColor1.value = withTiming("#8371ff");
      gradientColor2.value = withTiming("#86bfff");
    };
    if (themeName === ETheme.LIGHT) {
      handleChangeLightTheme();
    } else if (themeName === ETheme.DARK) {
      handleChangeDarkTheme();
    } else if (themeName === ETheme.SYSTEM) {
      if (onGetSystemTheme() === "light") {
        handleChangeLightTheme();
      } else {
        handleChangeDarkTheme();
      }
    }
  }, [cy, gradientColor1, gradientColor2, mask, theme, onGetSystemTheme]);

  return (
    <Canvas style={styles.container}>
      <Mask
        mode="luminance"
        mask={
          <Group>
            <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} color="white" />
            <Circle cx={RADIUS} cy={cy} r={mask} color={"black"} />
          </Group>
        }
      >
        <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} />
        <LinearGradient
          transform={[{ rotate: -90 }]}
          origin={{ x: RADIUS, y: RADIUS }}
          start={{ x: 0, y: 0 }}
          end={{ x: RADIUS * 2, y: RADIUS * 2 }}
          colors={colors}
        />
      </Mask>
    </Canvas>
  );
};

export default ThemeIcon;

const styles = StyleSheet.create({
  container: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    transform: [{ rotate: "45deg" }],
  },
});
