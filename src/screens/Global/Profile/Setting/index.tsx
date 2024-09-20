import { ButtonOutlined, ButtonPrimary } from "@components/Button";
import Row from "@components/Row";
import Separator from "@components/Separator";
import { useAuth } from "@context/authContext";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "./Components/Header";
import PersonalInfo from "./Components/PersonalInfo";

function SettingScreen() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  return (
    <MainLayout>
      <Separator height={normalize(40)} />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <ButtonPrimary onPress={logout} title={"Logout"} /> */}
        <Row direction="column" rowGap={30} center style={[styles.wrapper]}>
          <PersonalInfo />
          <PersonalInfo />
          <PersonalInfo />
        </Row>

        <Row direction="column" full style={[styles.wrapper]} rowGap={10}>
          <ButtonPrimary
            minWidth={"100%"}
            title="Logout"
            onPress={function (): void {}}
          />
          <ButtonOutlined
            minWidth={"100%"}
            title="Block account"
            onPress={function (): void {}}
          />
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
    padding: normalize(20),
  },
});

export default SettingScreen;
