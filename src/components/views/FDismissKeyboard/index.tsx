import React, { Component } from "react";
import { Platform, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

interface IProps
  extends Omit<
    KeyboardAwareScrollViewProps,
    | "enableOnAndroid"
    | "enableAutomaticScroll"
    | "contentContainerStyle"
    | "extraScrollHeight"
  > {
  autoScroll?: boolean;
  children?: React.ReactNode;
}
export default class FDismissKeyboard extends Component<IProps> {
  render() {
    const {
      children,
      autoScroll = false,
      extraHeight,
      ...resProps
    } = this.props;
    const isIOS = Platform.OS === "android";
    return (
      <KeyboardAwareScrollView
        scrollEnabled={autoScroll}
        extraHeight={isIOS ? undefined : extraHeight}
        extraScrollHeight={isIOS ? extraHeight : undefined}
        enableOnAndroid
        // enableAutomaticScroll={autoScroll}
        contentContainerStyle={{ flexGrow: 1 }}
        {...resProps}
      >
        <View>{children}</View>
      </KeyboardAwareScrollView>
    );
  }
}
