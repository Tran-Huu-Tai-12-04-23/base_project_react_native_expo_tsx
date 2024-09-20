import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
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
  size?: number;
}

const TextDefault: FC<Props> = ({
  children,
  style,
  bold,
  size = normalize(12),
  ...rest
}) => {
  const { theme } = useTheme();
  return (
    <RNText
      numberOfLines={rest.numberOfLines}
      style={[
        styleGlobal.text,
        bold && styleText.bold,
        rest.center && styleText.center,
        {
          fontFamily: "Roboto",
          fontSize: size,
          color: theme.text,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export const Title: FC<Props> = ({ children, style, bold, ...rest }) => {
  return (
    <RNText
      numberOfLines={rest.numberOfLines}
      style={[
        styleText.title,

        bold && styleText.bold,
        rest.center && styleText.center,
        style,
        {
          fontFamily: "Roboto",
        },
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
  title: {
    fontSize: normalize(18),
    fontWeight: "bold",
  },
});
export default TextDefault;
