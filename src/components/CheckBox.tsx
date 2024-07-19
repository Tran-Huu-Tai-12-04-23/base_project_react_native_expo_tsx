import { COLORS, normalize } from "@common/index";
import { IconEntypo } from "@helpers/deflibs";
import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface CheckType {
  status: boolean;
  resize?: number;
  /**
   *  press but need to reset status prop
   *  */
  onPress?: () => void;
  disable?: boolean;
  customStyles?: StyleProp<ViewStyle>;
}

const CheckBox: FC<CheckType> = (props) => {
  const {
    status = false,
    onPress,
    resize = 1,
    disable = false,
    customStyles,
  } = props;
  return (
    <TouchableOpacity
      disabled={disable}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.containtStyle,
        customStyles,
        {
          width: normalize(26) * resize,
          height: normalize(26) * resize,
          backgroundColor: status ? COLORS.white : "#f5f5f5",
        },
      ]}
    >
      <IconEntypo
        name="check"
        size={normalize(20) * resize}
        color={status ? COLORS.primary : "#f5f5f5"}
      />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  containtStyle: {
    width: normalize(26),
    height: normalize(26),
    borderRadius: normalize(5),
    borderWidth: normalize(1.5),
    borderColor: COLORS.bgGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
