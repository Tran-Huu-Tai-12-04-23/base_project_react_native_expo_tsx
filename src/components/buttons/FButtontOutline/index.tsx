import { COLORS } from "@common/index";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-elements";

type TButtonProps = Omit<ButtonProps, "type">;
interface IProps extends TButtonProps {}
export const FbuttonOutline = (props: IProps) => {
  const { titleStyle = {}, ...resProps } = props;
  return (
    <Button
      titleStyle={[
        titleStyle,
        {
          color: COLORS.secondary,
        },
      ]}
      buttonStyle={[styles.buttonStyle, { borderColor: COLORS.secondary }]}
      type="outline"
      {...resProps}
    />
  );
};
const styles = StyleSheet.create({
  buttonStyle: { borderWidth: 2 },
});
