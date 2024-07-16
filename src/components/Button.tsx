import { useTheme } from "@context/themContext";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import TextDefault from "./TextDefault";

type ButtonPrimaryProps = {
  round?: number;
  onPress: () => void;
  title: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  minWidth?: number;
  disabled?: boolean;
  full?: boolean;
};

const ButtonPrimary = ({
  full,
  round = 5,
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
      disabled={disabled}
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
        <TextDefault style={[{ color: theme.background }]}>{title}</TextDefault>
      )}
      {!isLoading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

const ButtonSecond = ({
  round = 5,
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
        <TextDefault style={[{ color: theme.text }]}>{title}</TextDefault>
      )}
      {!isLoading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

const ButtonLink = ({
  round = 5,
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
      <TextDefault style={[{ color: theme.primary, fontSize: 12 }]}>
        {title}
      </TextDefault>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    padding: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { ButtonLink, ButtonPrimary, ButtonSecond };
