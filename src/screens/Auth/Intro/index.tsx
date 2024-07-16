import { ButtonPrimary, ButtonSecond } from "@components/Button";
import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useLoading } from "@context/loadingGlobalContext";
import Helper from "@helper/helpers";
import { deviceWidth } from "@helper/utils";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import GetStartedIcon from "assets/svg/get-start";
import * as Updates from "expo-updates";
import moment from "moment";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import useLogin from "src/services/hooks/auth/useLogin";
import { styleGlobal } from "../../../styles";
export default function IntroScreen() {
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
    <SafeAreaView
      style={[
        styleGlobal.container,
        {
          position: "relative",
        },
      ]}
    >
      <Row
        direction="column"
        rowGap={10}
        full
        style={[styleGlobal.centerChild, { flex: 1 }]}
      >
        <GetStartedIcon />
        <TextDefault
          bold
          style={{ fontWeight: 900, fontSize: 20, textAlign: "center" }}
        >
          WELCOME TO LIFE MANAGER
        </TextDefault>
        <TextDefault center style={{ paddingHorizontal: 20 }}>
          Handle tasks, projects, and more with your teams. Remind for you about
          deadline of task.
        </TextDefault>
        <Row full direction="column" rowGap={10} style={{ marginTop: "auto" }}>
          <ButtonPrimary
            round={100}
            minWidth={deviceWidth * 0.8}
            title="Login"
            onPress={() => {
              navigate(ROUTE_KEY.LOGIN);
            }}
          />

          <ButtonSecond
            round={100}
            minWidth={deviceWidth * 0.8}
            title="Register"
            onPress={() => {}}
          />
        </Row>
        <Row full direction="column" rowGap={10} style={{ marginLeft: 35 }}>
          <TextDefault style={{ fontSize: 12 }}>
            Version:{" "}
            {Updates.runtimeVersion != null && Updates.runtimeVersion !== ""
              ? Updates.runtimeVersion
              : "1.0.0"}
          </TextDefault>
          <TextDefault style={{ fontSize: 12 }}>
            UpdatedAt:{" "}
            {Updates.createdAt == null
              ? "1.0.0"
              : moment(Updates.createdAt).format("DD/MM/YYYY HH:mm")}
          </TextDefault>
          <TextDefault style={{ fontSize: 12 }}>
            Env: {process.env.EXPO_PUBLIC_APP_VARIANT}
          </TextDefault>
        </Row>
      </Row>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
