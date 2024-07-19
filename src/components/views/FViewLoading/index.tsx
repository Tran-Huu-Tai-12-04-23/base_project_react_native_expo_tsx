import COLORS from "@common/colors/colors";
import React, { Component } from "react";
import {
  ActivityIndicator,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemeContext } from "react-native-elements";
interface ILayoutProps {
  isLoading?: boolean;
  labelLoading?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  children?: React.ReactNode;
}
export default class FViewLoading extends Component<ILayoutProps> {
  static contextType = ThemeContext;
  render() {
    const { isLoading, onLayout, labelLoading, children } = this.props;

    if (isLoading)
      return (
        <View
          style={[
            styles.view,
            {
              backgroundColor: COLORS.backgroundLoading,
            },
          ]}
        >
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={COLORS.primary}
          />
          {labelLoading && (
            <View style={{ backgroundColor: COLORS.white }}>
              <Text style={{ textAlign: "center", color: "orange" }}>
                {labelLoading} ...
              </Text>
            </View>
          )}
        </View>
      );
    else return children;
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    elevation: Platform.OS === "android" ? 3 : undefined,
    zIndex: 999,
  },
});
