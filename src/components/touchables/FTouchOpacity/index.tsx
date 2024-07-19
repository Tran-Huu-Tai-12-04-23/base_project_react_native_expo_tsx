import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface ITouchOpacityProps extends TouchableOpacityProps {
  children?: JSX.Element | JSX.Element[];
}

export default (props: ITouchOpacityProps) => {
  const { children, ...resProps } = props;
  return (
    <TouchableOpacity {...props} {...resProps}>
      {children}
    </TouchableOpacity>
  );
};
