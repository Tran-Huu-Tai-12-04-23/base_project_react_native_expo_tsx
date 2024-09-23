import { ButtonPrimary } from "@components/Button";
import HeaderCommon from "@components/HeaderCommon";
import Row from "@components/Row";
import Separator from "@components/Separator";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import { navigate } from "@navigation/NavigationService";
import { APP_ROUTE } from "@navigation/route";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { styleGlobal } from "src/styles";
import ChooseLevel from "./Steps/ChooseLevel";
import ChooseSubject from "./Steps/ChooseSubject";
import EnterDescription from "./Steps/EnterDescription";
import Success from "./Steps/Success";

const mapTitle = [
  "Choose your subject",
  "Choose your level",
  "Enter description",
  "Success",
];
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

  useEffect(() => {
    // Do something when reach the last page
    slide.current?.setPage(currentPage);
  }, [currentPage]);

  return (
    <MainLayout>
      <Separator height={normalize(40)} />
      <HeaderCommon title={mapTitle[currentPage]} />

      <PagerView
        scrollEnabled={false}
        ref={slide}
        style={styles.container}
        initialPage={currentPage}
      >
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
            alignItems: "center",
          },
        ]}
      >
        <Row
          start
          style={{ flex: 1, alignItems: "center" }}
          colGap={normalize(10)}
        >
          {[1, 2, 3, 4]?.map((_it, index) => {
            return (
              <View
                key={index}
                style={{
                  width: currentPage === index ? normalize(40) : normalize(15),
                  height: normalize(15),
                  backgroundColor:
                    currentPage === index
                      ? theme.primary
                      : theme.backgroundSecond,
                  borderRadius: normalize(15),
                }}
              />
            );
          })}
        </Row>
        <ButtonPrimary
          title={currentPage === pages.length - 1 ? "Play quiz" : "Next"}
          onPress={() => {
            if (currentPage === pages.length - 1) {
              navigate(APP_ROUTE.QUIZ_PLAY);
            } else {
              setCurrentPage(currentPage + 1);
            }
          }}
        />
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
