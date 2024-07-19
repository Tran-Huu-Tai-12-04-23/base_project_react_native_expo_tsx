import { COLORS, getStatusBarHeight } from "@common/index";
import React, { FC, ReactElement } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  ViewStyle,
} from "react-native";

type wrapperType = {
  wStyle?: ViewStyle;
  children?: Array<ReactElement> | ReactElement;
  safeAreaBgColor?: string;
  barStyle?: "default" | "light-content" | "dark-content";
  bgStatusBarColor?: string;
  isSafe?: boolean;
  pointerEvents?: "box-none" | "none" | "box-only" | "auto" | undefined;
};

const Wrapper: FC<wrapperType> = (props) => {
  const {
    wStyle,
    children,
    safeAreaBgColor,
    barStyle,
    bgStatusBarColor,
    isSafe = true,
  } = props;
  const defaultStyle = {
    flex: 1,
    backgroundColor: COLORS.primary,
  };
  return (
    <View
      style={[defaultStyle, wStyle]}
      pointerEvents={props.pointerEvents || "auto"}
    >
      <StatusBar
        barStyle={barStyle ?? "light-content"}
        backgroundColor={bgStatusBarColor ?? COLORS.primary}
        translucent={true}
      />
      {isSafe ? (
        <SafeAreaView
          style={{
            backgroundColor: COLORS.primary,
            flex: 1,
            paddingTop: Platform.OS == "android" ? getStatusBarHeight() : 0,
          }}
        >
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            {children}
          </View>
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default Wrapper;
