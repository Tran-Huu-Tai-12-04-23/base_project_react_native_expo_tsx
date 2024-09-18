import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React, { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Row from "src/components/Row";
import TextDefault from "src/components/TextDefault";
import { styleGlobal } from "src/styles";

const AnswerItem = forwardRef(
  (
    {
      data,
      onCheckCorrect,
    }: {
      data: string;
      onCheckCorrect: () => boolean;
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [dataAnswer, setDataAnswer] = React.useState<any>({
      isCorrect: null,
      borderColor: "transparent",
    });

    const handleSelectAnswer = () => {
      const isCorrect = onCheckCorrect();

      setDataAnswer({
        isCorrect: isCorrect,
        borderColor: isCorrect ? theme.success : theme.danger,
      });
    };

    const resetAnswer = () => {
      setDataAnswer({
        isCorrect: null,
        borderColor: "transparent",
      });
    };

    useImperativeHandle(ref, () => ({
      resetAnswer,
    }));

    return (
      <TouchableOpacity style={{ width: "100%" }} onPress={handleSelectAnswer}>
        <Row
          between
          full
          center
          style={[
            styles.container,
            {
              backgroundColor: theme.background,
              borderWidth: 1,
              borderColor: dataAnswer.borderColor,
            },
          ]}
        >
          <TextDefault center style={{ fontSize: normalize(18) }}>
            {data}
          </TextDefault>
        </Row>
      </TouchableOpacity>
    );
  }
);

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
