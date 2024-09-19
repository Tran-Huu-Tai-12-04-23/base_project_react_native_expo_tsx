import BackgroundImage from "@components/BackgroundImage";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useAuth } from "@context/authContext";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { deviceHeight } from "@helper/utils";
import MainLayout from "@layout/MainLayout";
import AvatarExample from "assets/svg/avatar-example";
import ProfileBackground from "assets/svg/profile-background";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { styleGlobal } from "src/styles";
import Chart from "./Components/Chart";
import Header from "./Components/Header";
import SummaryActivity from "./Components/SummaryActivity";

function ProfileScreen() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  return (
    <MainLayout>
      <BackgroundImage>
        <ProfileBackground />
      </BackgroundImage>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Separator height={normalize(deviceHeight * 0.2)} />
        {/* <ButtonPrimary onPress={logout} title={"Logout"} /> */}

        <Row
          direction="column"
          center
          style={[styles.wrapper, { backgroundColor: theme.background }]}
        >
          <View style={styles.avatar}>
            <AvatarExample />
          </View>
          <Separator height={normalize(30)} />
          <TextDefault size={normalize(18)} bold>
            TRan Huu Tai @HUutai
          </TextDefault>
          <Separator height={normalize(30)} />
          <SummaryActivity />
          <Separator height={normalize(30)} />
          <Chart />
        </Row>

        <Separator height={normalize(100)} />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  avatar: {
    position: "absolute",
    top: -normalize(50),
  },
  wrapper: {
    marginHorizontal: normalize(10),
    borderRadius: normalize(20),
    ...styleGlobal.shadow,
    padding: normalize(20),
    justifyContent: "flex-start",
  },
});

export default ProfileScreen;
