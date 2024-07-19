import { COLORS } from "@common";
import { ESize } from "@common/enums/ESize";
import { IconMaterial } from "@helpers/deflibs";
import React, { Component } from "react";
import { Platform, Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";
import { ITheme } from "~/stores/theme/theme.model";

interface IProps extends Omit<PickerSelectProps, "Icon"> {
  title?: string;
}
export default class FPicker extends Component<IProps> {
  static contextType = ThemeContext;

  defineStyle = () => {
    const { colors } = this.context.theme as ITheme;
    const mergeStyle = {
      viewContainer: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        flexDirection: "column",
        borderColor: colors.grey2,
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        paddingLeft: Platform.OS === "ios" ? 10 : 0,
      },
    };
    return mergeStyle;
  };
  newStyle = this.defineStyle();
  render() {
    const { colors } = this.context.theme as ITheme;
    const { secondary, third } = colors;
    const { viewContainer = {} } = this.newStyle;
    const { style = {}, title = "Select", ...resProps } = this.props;
    const { viewContainer: viewOld = {}, ...resStyle } = style;
    return (
      <>
        <View style={{ marginLeft: 10, marginBottom: 5 }}>
          <Text style={{ fontSize: 14, color: COLORS.black }}>{title}</Text>
        </View>
        <RNPickerSelect
          style={{
            done: {
              color: colors.white,
            },

            viewContainer: viewContainer as any,
            iconContainer: {
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            },
            chevronUp: {
              borderColor: colors.white,
            },
            chevronDown: {
              borderColor: colors.white,
            },

            modalViewMiddle: {
              backgroundColor: colors.primary,
            },
            modalViewBottom: {
              height: ESize.heightScreen / 2,
            },

            inputIOSContainer: {
              justifyContent: "center",
            },
            ...resStyle,
          }}
          pickerProps={{
            style: {
              marginTop: Platform.OS === "ios" ? -ESize.heightScreen / 4 : 0,
            },
          }}
          Icon={() => (
            <IconMaterial
              name="keyboard-arrow-down"
              size={25}
              color={colors.grey0}
              style={{ display: Platform.OS == "android" ? "none" : "flex" }}
            />
          )}
          {...resProps}
        />
      </>
    );
  }
}
