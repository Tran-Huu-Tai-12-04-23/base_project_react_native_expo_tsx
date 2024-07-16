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
};
const Input = ({ onChangeText, text, label, placeholder }: InputProps) => {
  const { theme } = useTheme();
  return (
    <Row full direction="column" start rowGap={5}>
      {label && (
        <TextDefault style={[styles.label, { color: theme.textSecond }]}>
          {label}
        </TextDefault>
      )}

      <TextInput
        autoCapitalize="none"
        keyboardType="default"
        placeholder={placeholder}
        placeholderTextColor={theme.textSecond}
        style={[
          styles.input,
          { backgroundColor: theme.input.toString(), width: "100%" },
        ]}
        onChangeText={onChangeText}
        value={text}
      />
    </Row>
  );
};

const InputPassword = ({
  onChangeText,
  text,
  label,
  placeholder,
}: InputProps) => {
  const { theme } = useTheme();
  const [isPass, setIsPass] = useState(true);
  return (
    <Row
      full
      direction="column"
      start
      rowGap={5}
      style={{ position: "relative" }}
    >
      {label && (
        <TextDefault style={[styles.label, { color: theme.textSecond }]}>
          {label}
        </TextDefault>
      )}

      <TextInput
        autoCapitalize="none"
        keyboardType="default"
        secureTextEntry={isPass}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecond}
        style={[
          styles.input,
          { backgroundColor: theme.input.toString(), width: "100%" },
        ]}
        onChangeText={onChangeText}
        value={text}
      />
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
});

export { Input, InputPassword };
