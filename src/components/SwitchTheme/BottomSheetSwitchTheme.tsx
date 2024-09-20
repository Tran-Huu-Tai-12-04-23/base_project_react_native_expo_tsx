import { useTheme } from "@context/themContext";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackDrop from "./BackDrop";
import SwitchTheme from "./SwitchTheme";
import ThemeIcon from "./ThemeIcon";

type Props = {};

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

// eslint-disable-next-line react/display-name
const BottomSheetSwitchTheme = forwardRef<BottomSheetMethods, Props>(
  ({}, ref) => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const [bottomSheetHeight, setBottomSheetHeight] = useState(1000);
    const OPEN = 0;
    const CLOSE = bottomSheetHeight + insets.bottom;
    const translateY = useSharedValue(CLOSE);

    const expand = useCallback(() => {
      translateY.value = withTiming(OPEN);
    }, [translateY]);

    const close = useCallback(() => {
      translateY.value = withTiming(CLOSE);
    }, [CLOSE, translateY]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close]
    );

    const animationStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const backgroundColorAnimation = useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(theme.background),
      };
    });

    const lineColorAnimation = useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(theme.text),
      };
    });

    const pan = Gesture.Pan()
      .onUpdate((event) => {
        if (event.translationY < 0) {
          translateY.value = withSpring(OPEN, {
            damping: 200,
            stiffness: 800,
          });
        } else {
          translateY.value = withSpring(event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (translateY.value > 50) {
          translateY.value = withSpring(CLOSE, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          translateY.value = withSpring(OPEN, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    return (
      <>
        <BackDrop
          close={close}
          translateY={translateY}
          openHeight={OPEN}
          closeHeight={CLOSE}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              {
                width: width * 0.92,
                bottom: insets.bottom,
              },
              animationStyle,
              backgroundColorAnimation,
            ]}
            onLayout={({ nativeEvent }) => {
              const { height } = nativeEvent.layout;
              if (height) {
                setBottomSheetHeight(height);
                translateY.value = withTiming(height + insets.bottom);
              }
            }}
          >
            <Animated.View style={[styles.line, lineColorAnimation]} />
            <ThemeIcon />
            <SwitchTheme />
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

export default BottomSheetSwitchTheme;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  line: {
    position: "absolute",
    top: 8,
    width: 40,
    height: 4,
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 14,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
