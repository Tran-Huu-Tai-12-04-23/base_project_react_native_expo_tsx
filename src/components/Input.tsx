import { useTheme } from "@context/themContext";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Row from "./Row";
import TextDefault from "./TextDefault";

type InputProps = {
  onChangeText: (text: string) => void;
  text: string;
  label?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  multiple?: boolean;
};
const Input = ({
  onChangeText,
  text,
  label,
  placeholder,
  leftIcon,
  multiple,
}: InputProps) => {
  const { theme } = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Row
      full
      direction="column"
      start
      rowGap={5}
      onTouchStart={(e) => e.stopPropagation()}
      style={[
        styles.borderBottom,
        {
          borderColor: isFocus ? theme.primary : theme.border,
        },
      ]}
    >
      {label && (
        <TextDefault style={[styles.label, { color: theme.textSecond }]}>
          {label}
        </TextDefault>
      )}

      <Row
        full
        start
        style={{
          alignItems: "center",
        }}
      >
        {leftIcon && leftIcon}
        <TextInput
          multiline={multiple}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoCapitalize="none"
          keyboardType="default"
          placeholder={placeholder}
          placeholderTextColor={theme.textSecond}
          style={[styles.input, { width: "100%" }]}
          onChangeText={onChangeText}
          value={text}
        />
      </Row>
    </Row>
  );
};

const InputPassword = ({
  onChangeText,
  text,
  label,
  placeholder,
  leftIcon,
}: InputProps) => {
  const { theme } = useTheme();
  const [isPass, setIsPass] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Row
      full
      direction="column"
      start
      rowGap={5}
      style={[
        { position: "relative" },
        styles.borderBottom,
        {
          borderColor: isFocus ? theme.primary : theme.border,
        },
      ]}
    >
      {label && (
        <TextDefault style={[styles.label, { color: theme.textSecond }]}>
          {label}
        </TextDefault>
      )}

      <Row
        full
        start
        style={{
          alignItems: "center",
        }}
      >
        {leftIcon && leftIcon}
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoCapitalize="none"
          keyboardType="default"
          secureTextEntry={isPass}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecond}
          style={[styles.input, { width: "100%" }]}
          onChangeText={onChangeText}
          value={text}
        />
      </Row>

      <TouchableOpacity
        style={styles.iconShowPass}
        onPress={() => setIsPass(!isPass)}
      >
        <Feather
          name={!isPass ? "eye" : "eye-off"}
          size={18}
          color={theme.textSecond}
        />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingVertical: 12,
    borderRadius: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
  },
  iconShowPass: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
});

export { Input, InputPassword };
