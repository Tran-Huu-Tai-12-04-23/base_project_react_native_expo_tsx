import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { styleGlobal } from "src/styles";
import TextDefault from "./TextDefault";

interface ButtonPrimaryProps {
  round?: number;
  onPress: () => void;
  title?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  minWidth?: number | "100%";
  disabled?: boolean;
  full?: boolean;
  borderColor?: string;
  textColor?: string;
}
interface IconButtonProps extends ButtonPrimaryProps {
  icon: React.ReactNode;
}

const ButtonPrimary = ({
  full,
  round = 100,
  onPress,
  isLoading,
  title,
  iconLeft,
  iconRight,
  minWidth = 100,
  disabled = false,
}: ButtonPrimaryProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled || isLoading}
      style={[
        style.btn,
        {
          backgroundColor: theme.primary,
          minWidth: minWidth,
          borderRadius: round,
        },
        disabled && style.disabled,
        full && { width: "100%" },
      ]}
    >
      {isLoading && <ActivityIndicator color={theme.background} />}
      {!isLoading && iconLeft && iconLeft}
      {title && (
        <TextDefault
          style={[{ color: theme.background, fontWeight: 600 }, style.txt]}
        >
          {title}
        </TextDefault>
      )}
      {!isLoading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

const ButtonOutlined = ({
  full,
  round = 100,
  onPress,
  isLoading,
  title,
  iconLeft,
  iconRight,
  minWidth = 100,
  disabled = false,
  borderColor = "",
}: ButtonPrimaryProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled || isLoading}
      style={[
        style.btn,
        {
          backgroundColor: "transparent",
          minWidth: minWidth,
          borderRadius: round,
          borderWidth: 1,
          borderColor: borderColor ? borderColor : theme.primary,
          borderStyle: "solid",
        },
        disabled && style.disabled,
        full && { width: "100%" },
      ]}
    >
      {isLoading && <ActivityIndicator color={theme.background} />}
      {!isLoading && iconLeft && iconLeft}
      {title && (
        <TextDefault
          style={[
            {
              color: borderColor ? borderColor : theme.primary,
              fontWeight: 600,
            },
            style.txt,
          ]}
        >
          {title}
        </TextDefault>
      )}
      {!isLoading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

const ButtonSecond = ({
  round = 100,
  onPress,
  isLoading,
  title,
  iconLeft,
  iconRight,
  minWidth = 100,
  disabled = false,
  textColor,
}: ButtonPrimaryProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled}
      style={[
        style.btn,
        {
          backgroundColor: theme.background,
          minWidth: minWidth,
          borderRadius: round,
        },
        disabled && style.disabled,
      ]}
    >
      {isLoading && <ActivityIndicator color={theme.primary} />}
      {!isLoading && iconLeft && iconLeft}
      {title && (
        <TextDefault
          style={[
            { color: textColor || theme.text, fontWeight: 600 },
            style.txt,
          ]}
        >
          {title}
        </TextDefault>
      )}
      {!isLoading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

const ButtonLink = ({
  round = 100,
  onPress,
  title,
  minWidth = 100,
  disabled = false,
}: ButtonPrimaryProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          minWidth: minWidth,
          borderRadius: round,
        },
        disabled && style.disabled,
      ]}
    >
      <TextDefault
        style={[
          { color: theme.primary, fontSize: normalize(12), fontWeight: "600" },
        ]}
      >
        {title}
      </TextDefault>
    </TouchableOpacity>
  );
};

const IconButton = ({
  round = 100,
  onPress,
  isLoading,
  iconLeft,
  iconRight,
  disabled = false,
  icon,
}: IconButtonProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled}
      style={[
        styleGlobal.centerChild,
        {
          backgroundColor: theme.backgroundSecond,
          borderRadius: round,
          width: normalize(40),
          height: normalize(40),
        },
        disabled && style.disabled,
        disabled && style.disabled,
      ]}
    >
      {isLoading && <ActivityIndicator color={theme.primary} />}
      {!isLoading && iconLeft && iconLeft}
      {icon && icon}
      {!isLoading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    padding: normalize(15),
    paddingVertical: 12,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
    minHeight: normalize(42),
    minWidth: normalize(42),
  },
  disabled: {
    opacity: 0.5,
  },
  txt: {
    fontSize: normalize(14),
  },
});

export { ButtonLink, ButtonOutlined, ButtonPrimary, ButtonSecond, IconButton };
