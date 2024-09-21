import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { normalize } from "@helper/helpers";
import React from "react";
import { StyleSheet } from "react-native";

function Success() {
  return (
    <Row full style={styles.container}>
      <TextDefault>Choose Success</TextDefault>
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
  },
});

export default Success;
