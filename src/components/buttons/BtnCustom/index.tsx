import { COLORS } from "@common/index";
import NTText from "@components/texts/FText";
import { ITouchOpacityProps } from "@components/touchables/FTouchOpacity";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface IProps extends ITouchOpacityProps {
  title?: string;
  widthBtn?: string;
  onPress: () => void;
  color?: string;
  styleTxt?: TextStyle;
  style?: ViewStyle;
  disable?: boolean;
}
export const BtnCustom = (props: IProps) => {
  const {
    title = "",
    onPress,
    color,
    widthBtn,
    styleTxt = {},
    style,
    disable,
  } = props;

  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        styles.shadown,
        {
          borderRadius: 9999999,
          paddingVertical: 15,
          // width: widthBtn ? widthBtn : "30%",
        },
        style,
      ]}
      onPress={onPress}
    >
      <LinearGradient
        start={{ x: 0.25, y: 0.0 }}
        end={{ x: 1.0, y: 0.5 }}
        locations={[0, 1]}
        colors={color ? [color, COLORS.grayf2f2f2] : ["#23568b", "#4794e6"]}
        style={[{ paddingVertical: 15, borderRadius: 9999999 }, style]}
      >
        <NTText
          w700
          h56
          center
          txtStyle={[
            {
              color: COLORS.white,
            },
            styleTxt,
          ]}
        >
          {title}
        </NTText>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: { borderWidth: 2 },
  shadown: {
    ...Platform.select({
      ios: {
        shadowOffset: { height: 2, width: -2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
