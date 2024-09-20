import { useTheme } from "@context/themContext";
import { ETheme } from "@context/useThemUtil";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SwitchTheme = () => {
  const { theme, themeName, onSaveThem } = useTheme();
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const SWITCH_CONTAINER_WIDTH = width * 0.8;
  const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / 3;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    if (themeName === ETheme.SYSTEM) {
      translateX.value = withSpring(SWITCH_WIDTH * 0);
    } else if (themeName === ETheme.LIGHT) {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    } else if (themeName === ETheme.DARK) {
      translateX.value = withSpring(SWITCH_WIDTH * 2);
    }
  }, [SWITCH_WIDTH, themeName, translateX]);

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(theme.background),
    };
  });

  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: withTiming(theme.text),
    };
  });

  const backgroundColorSlideAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(theme.backgroundSecond),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: SWITCH_CONTAINER_WIDTH,
        },
        backgroundColorAnimation,
      ]}
    >
      <Animated.View
        style={[
          styles.slideContainer,
          {
            width: SWITCH_WIDTH,
          },
          translateAnimation,
        ]}
      >
        <Animated.View
          style={[
            styles.slide,
            {
              width: (width * 0.7) / 3,
            },
            backgroundColorSlideAnimation,
          ]}
        />
      </Animated.View>
      <Pressable
        style={styles.button}
        onPress={() => onSaveThem(ETheme.SYSTEM)}
      >
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          System
        </Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => onSaveThem(ETheme.LIGHT)}
      >
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          Light
        </Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => onSaveThem(ETheme.DARK)}
      >
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          Dark
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default SwitchTheme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 40,
    overflow: "hidden",
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textButton: {
    color: "black",
    fontWeight: "500",
  },
  slideContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    padding: 23,
    borderRadius: 100,
    backgroundColor: "white",
  },
});
