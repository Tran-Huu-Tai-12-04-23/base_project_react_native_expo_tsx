import { COLORS, deviceHeight, deviceWidth, IMGAES } from "@common/index";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const EmptyList = () => {
  return (
    <View style={styles.containt}>
      <Image
        source={IMGAES.imgNotFound}
        resizeMode={"contain"}
        style={styles.imgStyle}
      />
      <Text style={{ fontSize: 14, color: COLORS.black }}>Danh sách trống</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  containt: {
    width: deviceWidth,
    height: deviceHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    width: 170,
    height: 280,
  },
});
