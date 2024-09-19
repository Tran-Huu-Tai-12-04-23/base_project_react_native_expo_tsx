import BackBtn from "@components/BackBtn";
import { ButtonOutlined } from "@components/Button";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { deviceWidth } from "@helper/utils";
import MainLayout from "@layout/MainLayout";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import AnswerItem from "./components/AnswerItem";
import QuestionItem from "./components/QuestionItem";
import { data } from "./dto";

function PlayQuizScreen() {
  const [restTimeBySecond, setRestTimeBySecond] = useState(0);

  const lstRef = useRef<any>([]);
  const { theme } = useTheme();
  const [newData, setNewData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX = 3;

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedValue.value > currentIndex + 0.5) {
      runOnJS(setActivityIndex)(currentIndex + 1);
    } else {
      runOnJS(setActivityIndex)(currentIndex);
    }
    const opacity = interpolate(
      animatedValue.value,
      [currentIndex, currentIndex + 0.3, currentIndex + 0.8, currentIndex + 1],
      [1, 0, 0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacity,
    };
  });

  const handleResetAnswer = () => {
    for (let i = 0; i < lstRef.current.length; i++) {
      if (lstRef.current[i]) {
        lstRef.current[i].resetAnswer();
      }
    }
  };

  useEffect(() => {
    handleResetAnswer();
  }, [currentIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    setRestTimeBySecond(0);
    interval = setInterval(() => {
      setRestTimeBySecond((prev) => prev + 1);
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Row
        direction="row"
        style={{
          position: "absolute",
          top: normalize(40),
          right: normalize(20),
          left: normalize(20),
          zIndex: 1000,
          alignItems: "center",
        }}
        rowGap={10}
        between
      >
        <BackBtn color={"white"} />
        <CircularProgress
          radius={normalize(20)}
          value={restTimeBySecond}
          titleFontSize={2}
          valueSuffix={"s"}
          maxValue={60}
          activeStrokeColor={
            restTimeBySecond > 50 ? theme.danger : theme.tabIconDefault
          }
          inActiveStrokeOpacity={0.2}
          inActiveStrokeWidth={6}
        />
        <TextDefault bold style={{ fontSize: normalize(18), color: "white" }}>
          8/9
        </TextDefault>
      </Row>
      <MainLayout>
        <Row full direction="column" style={{ flex: 1 }} rowGap={10} start>
          <LinearGradient
            // Background Linear Gradient
            colors={[theme.primary, theme.tabIconDefault, theme.border]}
            style={{
              width: deviceWidth,
              minHeight: deviceWidth * 0.9,
              borderBottomEndRadius: normalize(20),
              borderBottomStartRadius: normalize(20),
            }}
          >
            <Separator height={normalize(40)} />
            <View style={[styles.cardContainer]}>
              {newData.map((item, index) => {
                if (index > currentIndex + MAX || index < currentIndex) {
                  return null;
                }
                return (
                  <QuestionItem
                    newData={newData}
                    setNewData={setNewData}
                    maxVisibleItems={MAX}
                    item={item}
                    index={index}
                    dataLength={newData.length}
                    animatedValue={animatedValue}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    key={index}
                  />
                );
              })}
            </View>
          </LinearGradient>
          <Animated.View
            style={[{ width: "100%", padding: normalize(10) }, animatedStyle]}
          >
            <Row direction="column" start rowGap={5}>
              <TextDefault bold style={{ fontSize: normalize(16) }}>
                Choose the correct answer
              </TextDefault>
              <Separator height={normalize(20)} />
              {data[currentIndex]?.lstAnswers.map((item, index) => {
                return (
                  <AnswerItem
                    ref={(ref) => (lstRef.current[index] = ref)}
                    data={item}
                    key={index}
                    onCheckCorrect={() => {
                      handleResetAnswer();
                      return index === data[currentIndex]?.correctAnswerIndex;
                    }}
                  />
                );
              })}
              <Separator height={normalize(20)} />
              <Row full center>
                <ButtonOutlined
                  title="Hint"
                  round={normalize(5)}
                  onPress={function (): void {}}
                />
              </Row>
            </Row>
          </Animated.View>
        </Row>
      </MainLayout>
    </GestureHandlerRootView>
  );
}
export default PlayQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    position: "relative",
    paddingHorizontal: 16,
  },
});
