import { COLORS } from "@common/index";
import FTouchOpacity, {
  ITouchOpacityProps,
} from "@components/touchables/FTouchOpacity";
import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { ThemeContext } from "react-native-elements";

interface IProps extends ITouchOpacityProps {
  title?: string;
}
export const Fbutton = (props: IProps) => {
  const context = useContext(ThemeContext);
  const { title = "", ...resProps } = props;

  return (
    <FTouchOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
      }}
      {...resProps}
    >
      <Text style={{ fontSize: 16, margin: 10, color: COLORS.white }}>
        {title}
      </Text>
    </FTouchOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: { borderWidth: 2 },
});
