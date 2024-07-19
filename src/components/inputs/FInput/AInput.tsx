import { COLORS, normalize } from "@common/index";
import React, { FC } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Input } from "react-native-elements";
import AText from "../../texts/FText";

type InputDefaultProp = {
  label?: string;
  cStyle?: ViewStyle;
  customRef?: any;
  isRequire?: boolean;
  iStyle?: ViewStyle;
  labelStyle?: TextStyle;
  ipHeight?: number;
  disable?: boolean;
  width?: number;
};

const InputDefault: FC<
  React.RefAttributes<TextInput> & TextInputProps & InputDefaultProp
> = (props) => {
  const {
    label = "",
    cStyle = {},
    customRef,
    isRequire = false,
    iStyle = {},
    labelStyle = {},
    ipHeight,
    disable = false,
    width,
  } = props;
  return (
    <View style={{ flex: 1, justifyContent: "space-between", width }}>
      {label !== "" ? (
        <AText h5 txtStyle={[labelStyle, { marginBottom: normalize(5) }]}>
          {label}{" "}
          {isRequire && (
            <AText h5 txtStyle={{ color: "red", fontWeight: "normal" }}>
              *
            </AText>
          )}
        </AText>
      ) : null}
      <Input
        ref={customRef}
        disabled={disable}
        containerStyle={[
          styles.inputContaintStyle,
          cStyle,
          !!ipHeight && { height: ipHeight },
          { backgroundColor: disable ? "#f5f5f5" : COLORS.white },
        ]}
        inputContainerStyle={[
          styles.inputStyle,
          iStyle,
          !!ipHeight && { height: ipHeight },
        ]}
        renderErrorMessage={false}
        style={{
          fontSize: normalize(12),
          color: disable ? "#777777" : COLORS.black,
          fontWeight: disable ? "bold" : "normal",
        }}
        returnKeyType={"send"}
        {...props}
      />
    </View>
  );
};

export default InputDefault;

const styles = StyleSheet.create({
  inputContaintStyle: {
    height: normalize(30),
    borderRadius: normalize(5),
    width: "100%",
    borderWidth: normalize(1),
    borderColor: COLORS.grayBDBDBD,
  },
  inputStyle: {
    height: normalize(30),
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
});
