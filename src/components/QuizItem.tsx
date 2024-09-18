import { useTheme } from "@context/themContext";
import { AntDesign } from "@expo/vector-icons";
import { normalize } from "@helper/helpers";
import { navigate } from "@navigation/NavigationService";
import { APP_ROUTE } from "@navigation/route";
import QuizIconItem from "assets/svg/quiz-item-icon";
import React from "react";
import { TouchableOpacity } from "react-native";
import Row from "./Row";
import TextDefault from "./TextDefault";

function QuizItem() {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={() => navigate(APP_ROUTE.QUIZ_PLAY)}>
      <Row
        full
        between
        style={{
          padding: normalize(5),
          borderRadius: normalize(10),
          borderWidth: 1,
          borderColor: theme.primary,
          backgroundColor: theme.background,
        }}
      >
        <Row>
          <QuizIconItem />
          <Row start direction="column" rowGap={4}>
            <TextDefault bold>Statistics math quiz</TextDefault>
            <TextDefault>Math . 12 quizzes</TextDefault>
          </Row>
        </Row>
        <AntDesign name="caretright" size={12} color={theme.primary} />
      </Row>
    </TouchableOpacity>
  );
}

export default QuizItem;
