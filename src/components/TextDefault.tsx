import React, { FC, ReactNode } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { styleGlobal } from "src/styles";

interface Props extends RNTextProps {
  children: ReactNode;
  bold?: boolean;
  center?: boolean;
  numberOfLine?: number;
}

const TextDefault: FC<Props> = ({ children, style, bold, ...rest }) => {
  return (
    <RNText
      numberOfLines={rest.numberOfLines}
      style={[
        styleGlobal.text,
        style,
        bold && styleText.bold,
        rest.center && styleText.center,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styleText = StyleSheet.create({
  center: { textAlign: "center" },
  bold: {
    fontWeight: "bold",
  },
});
export default TextDefault;
