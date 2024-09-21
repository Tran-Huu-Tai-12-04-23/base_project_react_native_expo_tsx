import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import EditIcon from "assets/svg/edit-icon";
import QuizIcon from "assets/svg/quiz-icon";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
function SummaryActivity() {
  const { theme } = useTheme();
  const [value, setValue] = useState(0);
  return (
    <Row
      center
      full
      direction="column"
      style={{
        padding: normalize(10),
        borderRadius: normalize(20),
        backgroundColor: theme.backgroundSecond,
      }}
      rowGap={10}
    >
      <CircularProgress
        radius={normalize(90)}
        value={37}
        valueSuffixStyle={{
          fontSize: normalize(12),
        }}
        valueSuffix="/100"
        title={"quiz played"}
        maxValue={100}
        subtitleFontSize={normalize(16)}
        titleStyle={{
          fontSize: normalize(16),
          fontWeight: "bold",
        }}
        activeStrokeColor={theme.primary}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={20}
        activeStrokeWidth={20}
        duration={1000}
        onAnimationComplete={() => setValue(50)}
      />

      <Row center colGap={20}>
        <View style={[styles.leftIcon, { backgroundColor: theme.background }]}>
          <TextDefault bold size={normalize(20)}>
            5
          </TextDefault>
          <TextDefault>Quiz created</TextDefault>
          <View style={styles.icon}>
            <EditIcon color={"white"} size={normalize(32)} />
          </View>
        </View>
        <View style={[styles.leftIcon, { backgroundColor: theme.primary }]}>
          <TextDefault style={{ color: "white" }} bold size={normalize(20)}>
            21
          </TextDefault>
          <TextDefault style={{ color: "white" }}>Quiz won</TextDefault>

          <View style={styles.icon}>
            <QuizIcon size={normalize(32)} />
          </View>
        </View>
      </Row>
    </Row>
  );
}

export default SummaryActivity;

const styles = StyleSheet.create({
  leftIcon: {
    padding: normalize(10),
    borderRadius: normalize(10),
    width: "45%",
  },
  icon: {
    position: "absolute",
    right: normalize(10),
    top: normalize(10),
  },
});
