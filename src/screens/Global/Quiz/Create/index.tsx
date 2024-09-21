import { ButtonPrimary } from "@components/Button";
import HeaderCommon from "@components/HeaderCommon";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import React, { Fragment, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { styleGlobal } from "src/styles";
import ChooseLevel from "./Steps/ChooseLevel";
import ChooseSubject from "./Steps/ChooseSubject";
import EnterDescription from "./Steps/EnterDescription";
import Success from "./Steps/Success";

function CreateQuizScreen() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const slide = useRef<PagerView | null>(null);

  const pages = [
    <ChooseSubject />,
    <ChooseLevel />,
    <EnterDescription />,
    <Success />,
  ];

  return (
    <MainLayout>
      <Separator height={normalize(40)} />
      <HeaderCommon title="Choose  your subject" />

      <PagerView ref={slide} style={styles.container} initialPage={0}>
        {pages.map((page, index) => (
          <Fragment key={index}>{page}</Fragment>
        ))}
      </PagerView>
      <Row
        full
        between
        style={[
          styles.bottomAction,
          {
            borderColor: theme.border,
          },
        ]}
      >
        <TextDefault>dot</TextDefault>
        <ButtonPrimary title="Next" onPress={function (): void {}} />
      </Row>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bottomAction: {
    position: "absolute",
    bottom: normalize(20),
    width: "100%",
    paddingHorizontal: normalize(20),
    alignItems: "flex-end",
    ...styleGlobal.borderTop,

    paddingVertical: normalize(10),
  },
});

export default CreateQuizScreen;
