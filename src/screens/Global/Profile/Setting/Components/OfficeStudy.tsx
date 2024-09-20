import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";
import { StyleSheet } from "react-native";
import { styleGlobal } from "src/styles";
import RowItem from "./RowItem";

function OfficeStudy() {
  const { theme } = useTheme();
  return (
    <Row direction="column" full start rowGap={normalize(5)}>
      <TextDefault>Office Study</TextDefault>
      <Row
        full
        direction="column"
        start
        style={[
          styles.wrapper,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        <RowItem
          isBorderBottom
          title={"Save sets for offline studying"}
          subTitle="Your 8 most recently studied sets will be downloaded to
              automatically"
          isChecked
        />
        <RowItem title={"Manager storage"} />
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...styleGlobal.shadow,
    ...styleGlobal.border,
    borderRadius: normalize(10),
  },
  item: {
    padding: normalize(10),
    borderBottomWidth: 1,
    alignItems: "center",
  },
});

export default OfficeStudy;
