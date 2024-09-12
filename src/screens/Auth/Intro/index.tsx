import { ButtonOutlined, ButtonPrimary } from "@components/Button";
import Carousel from "@components/Carousel";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useLoading } from "@context/loadingGlobalContext";
import { useTheme } from "@context/themContext";
import Helper, { normalize } from "@helper/helpers";
import { deviceHeight, deviceWidth } from "@helper/utils";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import { localImages } from "assets/localImage";
import { LinearGradient } from "expo-linear-gradient";
import * as Updates from "expo-updates";
import moment from "moment";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import useLogin from "src/services/hooks/auth/useLogin";
import { styleGlobal } from "../../../styles";

const pages = [
  {
    backgroundColor: "#FFC107",
    content: (
      <Image
        style={{ flex: 1, height: deviceHeight, width: deviceWidth }}
        source={localImages().intro1Light}
      />
    ),
  },
  {
    backgroundColor: "#2196F3",
    content: (
      <Image
        style={{ flex: 1, height: deviceHeight, width: deviceWidth }}
        source={localImages().intro2Light}
      />
    ),
  },
];

export default function IntroScreen() {
  const { theme } = useTheme();
  const { onLogin } = useLogin();
  const { startLoading, stopLoading } = useLoading();
  const handleSubmit = async (body: any) => {
    startLoading();
    await onLogin(body).then(async (res) => {
      if (!res) return;
    });
    stopLoading();
  };
  useEffect(() => {
    const startUserData = async () => {
      await Helper.getUserLoginData().then(async (data) => {
        if (data) {
          await handleSubmit(JSON.parse(data));
        }
      });
    };
    startUserData();
  }, []);

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
        }
      } catch (e) {}
    };
    checkUpdate();
  }, []);
  return (
    <View
      style={[
        styleGlobal.container,
        {
          position: "relative",
          backgroundColor: theme.background,
        },
      ]}
    >
      <Carousel pages={pages} />
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={{
          height: normalize(deviceWidth * 0.8),
          width: deviceWidth,
          transform: [{ translateY: 30 }],
          borderRadius: 10,
          position: "absolute",
          bottom: 0,
        }}
      />
      <Row
        direction="column"
        rowGap={10}
        full
        style={[
          styleGlobal.centerChild,
          { flex: 1, position: "absolute", bottom: 10 },
        ]}
      >
        <TextDefault
          bold
          style={{
            fontWeight: 900,
            fontSize: normalize(20),
            textAlign: "center",
            paddingHorizontal: normalize(20),
          }}
        >
          Various Class Choices In One App
        </TextDefault>
        <TextDefault
          center
          style={{ color: "gray", paddingHorizontal: normalize(40) }}
        >
          Explore the best courses online with thousands of classes in design,
          business, marketing, and many more.
        </TextDefault>
        <Separator height={normalize(deviceWidth * 0.5)} />
        <Row full rowGap={10} direction="column" style={{ marginTop: "auto" }}>
          <ButtonPrimary
            round={100}
            minWidth={deviceWidth * 0.8}
            title="Continue"
            onPress={() => {
              navigate(ROUTE_KEY.GET_STARTED);
            }}
          />

          <ButtonOutlined
            borderColor={theme.background}
            round={100}
            minWidth={deviceWidth * 0.8}
            title="Skip"
            onPress={() => {}}
          />
        </Row>
        <Row full direction="column" rowGap={10}>
          <TextDefault style={{ fontSize: 12, color: "white" }}>
            Version:{" "}
            {Updates.runtimeVersion != null && Updates.runtimeVersion !== ""
              ? Updates.runtimeVersion
              : "1.0.0"}
          </TextDefault>
          <TextDefault style={{ fontSize: 12, color: "white" }}>
            UpdatedAt:{" "}
            {Updates.createdAt == null
              ? "1.0.0"
              : moment(Updates.createdAt).format("DD/MM/YYYY HH:mm")}
          </TextDefault>
          <TextDefault style={{ fontSize: 12, color: "white" }}>
            Env: {process.env.EXPO_PUBLIC_APP_VARIANT}
          </TextDefault>
        </Row>
        <Separator height={normalize(20)} />
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({});
