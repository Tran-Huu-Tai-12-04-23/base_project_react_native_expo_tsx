import QuizItem from "@components/QuizItem";
import Row from "@components/Row";
import Separator from "@components/Separator";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";

function LstQuizzes() {
  const { theme } = useTheme();
  return (
    <Row
      full
      center
      direction="column"
      style={{
        backgroundColor: theme.primary,
        borderTopLeftRadius: normalize(20),
        borderTopRightRadius: normalize(20),
        padding: normalize(10),
      }}
    >
      <QuizItem />
      <Separator height={10} />
      <QuizItem />
      <Separator height={10} />
      <QuizItem />
      <Separator height={10} />
      <QuizItem />
      <Separator height={normalize(80)} />
    </Row>
  );
}

export default LstQuizzes;
