import { COLORS } from "@common/index";
import React from "react";
import { Platform } from "react-native";
import { Input, InputProps } from "react-native-elements";

interface IProps extends InputProps {
  type?: "default" | "circle" | "square";
  forwardRef?: any;
  disable?: boolean;
  inputContainerStyle?: any;
  inputStyleOld?: any;
  leftIconContainerStyleOld?: any;
  rightIconContainerStyleOld?: any;
}

const FInput: React.FC<IProps> = ({
  type = "default",
  forwardRef,
  disable,
  inputStyleOld,
  leftIconContainerStyleOld,
  rightIconContainerStyleOld,
  ...resProps
}) => {
  const { leftIcon, rightIcon } = resProps;
  const isIcon = leftIcon || rightIcon;
  const inputStyle = {
    marginLeft: leftIcon ? 5 : 12,
    marginRight: rightIcon ? 5 : 12,
    color: "black",
  };

  const leftIconContainerStyle = {
    marginLeft: 10,
  };
  const rightIconContainerStyle = {
    marginRight: 10,
  };
  const commonStyleInput = {
    borderWidth: 1,
    borderColor: disable ? COLORS.grayf5f5f5 : COLORS.grayBDBDBD,
    borderStyle: "solid",
  };
  if (Platform.OS !== "android") {
    Object.assign(commonStyleInput, {
      paddingTop: isIcon ? 0 : 3,
      paddingBottom: isIcon ? 0 : 3,
    });
  }
  const inputContainerStyle =
    type === "circle"
      ? {
          ...commonStyleInput,
          borderRadius: 50,
        }
      : type === "square"
      ? {
          ...commonStyleInput,
          borderRadius: 5,
        }
      : {
          ...commonStyleInput,
          borderRadius: 5,
        };

  return (
    <Input
      ref={forwardRef}
      selectionColor={"black"}
      inputContainerStyle={inputContainerStyle}
      inputStyle={inputStyle}
      leftIconContainerStyle={leftIcon ? leftIconContainerStyle : {}}
      rightIconContainerStyle={rightIcon ? rightIconContainerStyle : {}}
      disabled={disable}
      {...(resProps as any)}
    />
  );
};

export default FInput;
