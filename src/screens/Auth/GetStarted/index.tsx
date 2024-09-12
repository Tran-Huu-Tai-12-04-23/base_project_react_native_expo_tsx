import { ButtonPrimary, IconButton } from "@components/Button";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { deviceHeight, deviceWidth } from "@helper/utils";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import { localImages } from "assets/localImage";
import AppleIcon from "assets/svg/apple-icon";
import FacebookIcon from "assets/svg/facebook-icon";
import GoogleIcon from "assets/svg/google-icon";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { styleGlobal } from "../../../styles";

export default function GetStartedScreen() {
  const { theme } = useTheme();

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
      <Image
        style={{ flex: 1, height: deviceHeight, width: deviceWidth }}
        source={localImages().getStartLight}
      />

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
            fontSize: normalize(26),
            color: "white",
            textAlign: "center",
            paddingHorizontal: normalize(22),
          }}
        >
          Welcome to QuizWise
        </TextDefault>
        <TextDefault
          center
          style={{ color: "gray", paddingHorizontal: normalize(40) }}
        >
          One Lesson at a Time with QuizWise
        </TextDefault>
        <Separator height={normalize(deviceWidth * 0.2)} />

        <Row
          full
          rowGap={10}
          direction="column"
          style={{
            marginTop: "auto",
            marginBottom: normalize(deviceWidth * 0.4),
          }}
        >
          <ButtonPrimary
            round={100}
            minWidth={deviceWidth * 0.8}
            title="Get started"
            onPress={() => {
              navigate(ROUTE_KEY.LOGIN);
            }}
          />

          <Separator height={normalize(10)} />
          <Row colGap={10} style={{ marginHorizontal: normalize(20) }}>
            <View
              style={[
                styles.spacing,
                { backgroundColor: theme.backgroundSecond },
              ]}
            />
            <TextDefault style={{ color: theme.backgroundSecond }}>
              Sign in with
            </TextDefault>
            <View
              style={[
                styles.spacing,
                { backgroundColor: theme.backgroundSecond },
              ]}
            />
          </Row>
          <Separator height={normalize(10)} />

          <Row full center colGap={normalize(10)}>
            <IconButton onPress={() => {}} icon={<GoogleIcon />} />
            <IconButton onPress={() => {}} icon={<FacebookIcon />} />
            <IconButton onPress={() => {}} icon={<AppleIcon />} />
          </Row>
        </Row>
      </Row>

      <Row center colGap={10}>
        <TextDefault style={{ color: theme.background }}>
          Don't have an account?
        </TextDefault>
        <TextDefault
          bold
          style={{ color: theme.tabIconSelected }}
          onPress={() => {
            navigate(ROUTE_KEY.LOGIN);
          }}
        >
          Register
        </TextDefault>
      </Row>
      <Separator height={normalize(30)} />
    </View>
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: normalize(1),
    width: "30%",
  },
});
