import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import MarkView from "assets/svg/mark";
import QuizIcon from "assets/svg/quiz-icon";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

function RecentQuizItem() {
  const { theme } = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Row
        direction="row"
        colGap={10}
        full
        style={{ flex: 1, paddingHorizontal: normalize(10) }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: theme.primary,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View style={{ position: "absolute" }}>
            <MarkView />
          </View>
          <Row full between>
            <Row direction="column" start rowGap={10}>
              <TextDefault bold style={{ color: theme.contrastText }}>
                RECENT QUIZ
              </TextDefault>
              <Row>
                <QuizIcon />
                <TextDefault
                  style={{ color: theme.contrastText, fontSize: normalize(16) }}
                >
                  A basic quiz
                </TextDefault>
              </Row>
            </Row>
            <Row center direction="column" rowGap={5}>
              <CircularProgress
                radius={normalize(40)}
                value={85}
                titleFontSize={2}
                valueSuffix={"%"}
                activeStrokeColor={theme.background}
                inActiveStrokeOpacity={0.2}
                inActiveStrokeWidth={6}
                duration={1000}
              />
              {/* <Progress.Pie size={60} color={theme.background} progress={0.4} />
              <TextDefault
                style={{ color: theme.background, fontSize: normalize(12) }}
              >
                65%
              </TextDefault> */}
            </Row>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
}

export default RecentQuizItem;
