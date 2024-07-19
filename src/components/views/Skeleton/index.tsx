// import stylesApp from "@screens/app/styleApp";
import React, { Component } from "react";
import { View } from "react-native";
interface props {
  loading: Boolean;
  numberRender?: number;
  children?: React.ReactNode;
}

export default class Skeleton extends Component<props> {
  render() {
    const { loading, numberRender = 3, children } = this.props;

    if (!loading) {
      return null;
    }

    return (
      <View style={{ marginBottom: 10 }}>
        {/* {[...Array(numberRender).keys()].map((data, idx) => (
                    <View style={[stylesApp.mgTop20, { marginHorizontal: 10 }]} key={idx}>
                        <SkeletonPlaceholder >
                            <View>
                                {children}
                            </View>
                        </SkeletonPlaceholder>
                    </View>

                ))
                } */}
        {/* <View style={[stylesApp.mgTop20, { marginHorizontal: 10 }]}>
          <SkeletonPlaceholder>
            <View>{children}</View>
            <View style={{ marginTop: 10 }}>{children}</View>
            <View style={{ marginTop: 10 }}>{children}</View>
          </SkeletonPlaceholder>
        </View> */}
      </View>
    );
  }
}
