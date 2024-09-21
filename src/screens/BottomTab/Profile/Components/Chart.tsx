import { IconButton } from "@components/Button";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault, { Title } from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { deviceWidth } from "@helper/utils";
import ChartIcon from "assets/svg/chart-icon";
import React from "react";
import { StyleSheet, View } from "react-native"; // Ensure StyleSheet is imported

const categoryData: { name: string; color: string }[] = [
  { name: "Math", color: "#FFD6DD" },
  { name: "Sports", color: "#C4D0FB" },
  { name: "Music", color: "#A9ADF3" },
];

function Chart() {
  const { theme } = useTheme();
  return (
    <Row
      direction="column"
      rowGap={10}
      full
      style={[styles.container, { backgroundColor: theme.primary }]}
    >
      <Row between full>
        <Title style={{ color: "white", maxWidth: "80%" }}>
          Top performance by category
        </Title>
        <IconButton icon={<ChartIcon />} onPress={function (): void {}} />
      </Row>

      <Row full start colGap={10}>
        {categoryData.map((item, index) => (
          <Row colGap={5} center key={index}>
            <View
              style={[
                styles.rounded,
                {
                  backgroundColor: item.color,
                },
              ]}
            />
            <TextDefault bold style={{ color: "white" }}>
              {item.name}
            </TextDefault>
          </Row>
        ))}
      </Row>
      <Separator height={20} />
      <Row
        between
        full
        style={{
          alignItems: "flex-end",
        }}
      >
        <Row direction="column" rowGap={normalize(20)} style={{ width: "25%" }}>
          {["100%", "75%", "50%", "25%", "0%"].map((item, index) => (
            <View key={index} style={{ width: "100%" }}>
              <TextDefault style={{ color: "white" }} bold>
                {item}
              </TextDefault>

              <View
                style={[styles.line, { backgroundColor: theme.tabIconDefault }]}
              />
            </View>
          ))}
        </Row>
        <Row direction="column" rowGap={50} style={{ width: "25%" }}>
          <View
            style={{
              width: normalize(deviceWidth / 4 - 50),
              height: 100,
              backgroundColor: "#FFD6DD",
              borderTopEndRadius: normalize(5),
              borderTopStartRadius: normalize(5),
            }}
          />
        </Row>
        <Row direction="column" rowGap={50} style={{ width: "25%" }}>
          <View
            style={{
              width: normalize(deviceWidth / 4 - 50),
              height: 120,
              backgroundColor: "#A9ADF3",
              borderTopEndRadius: normalize(5),
              borderTopStartRadius: normalize(5),
            }}
          />
        </Row>
        <Row direction="column" rowGap={50} style={{ width: "25%" }}>
          <View
            style={{
              width: normalize(deviceWidth / 4 - 50),
              height: 50,
              backgroundColor: "#C4D0FB",
              borderTopEndRadius: normalize(5),
              borderTopStartRadius: normalize(5),
            }}
          />
        </Row>
      </Row>
      <Row end full>
        {["3/10", "9/10", "7/10"].map((item, index) => (
          <Row
            center
            rowGap={5}
            direction="column"
            key={index}
            style={{ width: "25%", paddingHorizontal: normalize(5) }}
          >
            <TextDefault
              style={{ color: "white", fontSize: normalize(14) }}
              bold
            >
              {item}
            </TextDefault>
            <TextDefault style={{ color: "white", fontSize: normalize(12) }}>
              Total
            </TextDefault>
          </Row>
        ))}
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: normalize(20),
    borderRadius: normalize(20),
  },
  rounded: {
    padding: normalize(5),
    borderRadius: normalize(1000),
  },
  line: {
    width: deviceWidth - normalize(150),
    height: 1,
    position: "absolute",
    top: "100%",
    left: "80%",
  },
});

export default Chart;
