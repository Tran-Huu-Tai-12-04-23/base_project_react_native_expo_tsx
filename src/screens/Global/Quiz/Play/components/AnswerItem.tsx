import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { styleGlobal } from "src/styles";

function AnswerItem({ data }: { data: string }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={{ width: "100%" }}>
      <Row
        between
        full
        center
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <TextDefault center style={{ fontSize: normalize(18) }}>
          {data}
        </TextDefault>
      </Row>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: normalize(10),
    borderRadius: normalize(5),
    justifyContent: "center",
    alignItems: "center",
    ...styleGlobal.shadow,
  },
});

export default AnswerItem;
