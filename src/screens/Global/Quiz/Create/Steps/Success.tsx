import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { normalize } from "@helper/helpers";
import { deviceWidth } from "@helper/utils";
import { localImages } from "assets/localImage";
import React from "react";
import { Image, StyleSheet } from "react-native";

function Success() {
  return (
    <Row full direction="column" rowGap={10} style={styles.container}>
      <Separator height={normalize(20)} />
      <Image source={localImages().complete} style={styles.completeIcon} />

      <TextDefault bold size={normalize(18)} center>
        Congratulation! You have successfully created a quiz
      </TextDefault>
    </Row>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: normalize(25),
    height: normalize(10),
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: normalize(20),
  },
  completeIcon: {
    width: normalize(deviceWidth / 2 + 100),
    height: normalize(deviceWidth / 2 + 100),
    resizeMode: "contain",
    marginBottom: normalize(20),
  },
});

export default Success;
