import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";
import { StyleSheet } from "react-native";
import { styleGlobal } from "src/styles";
import RowItem from "./RowItem";

const aboutData = [
  { name: "Privacy policy", link: "https://www.google.com/" },
  { name: "Team of service", link: "https://www.google.com/" },
  { name: "Open source license", link: "https://www.google.com/" },
  { name: "Help center", link: "https://www.google.com/" },
];

function AboutInfo() {
  const { theme } = useTheme();
  return (
    <Row direction="column" full start rowGap={normalize(5)}>
      <TextDefault>About</TextDefault>
      <Row
        full
        direction="column"
        start
        style={[
          styles.wrapper,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        {aboutData.map((item, index) => (
          <RowItem
            title={item.name}
            key={index}
            isBorderBottom={index < aboutData.length - 1}
          />
        ))}
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

export default AboutInfo;
