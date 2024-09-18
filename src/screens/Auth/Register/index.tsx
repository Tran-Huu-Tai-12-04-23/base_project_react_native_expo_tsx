import BackBtn from "@components/BackBtn";
import EffectBackgroundView from "@components/EffectBackgroundView";
import { ButtonPrimary, Input, InputPassword } from "@components/index";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import Helper, { EKeyCheck, normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import EmailIcon from "assets/svg/email-icon";
import LockIcon from "assets/svg/lock-icon";
import PersonalIcon from "assets/svg/personal-icon";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

interface RegisterBody {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}
export default function RegisterScreen() {
  const { theme } = useTheme();
  const [isRemember, setIsRemember] = useState(false);
  const [userInput, setUserInput] = useState<RegisterBody>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const handleSubmit = async (body: RegisterBody) => {};
  const handleRegister = async () => {
    const missingField = Helper.verifyField(userInput, [EKeyCheck.STRING]);

    if (missingField.length > 0) {
      return Toast.show({
        type: "error",
        text1: "Filed required!",
        text2: missingField.join(", "),
      });
    }
    await handleSubmit(userInput);
  };

  const handleChangeInput = (key: string, value: string) => {
    setUserInput({
      ...userInput,
      [key]: value,
    });
  };

  return (
    <MainLayout>
      <EffectBackgroundView />

      <Row
        full
        direction="column"
        style={{ flex: 1, paddingHorizontal: 20 }}
        rowGap={10}
        start
      >
        <Separator height={normalize(40)} />
        <Row full between>
          <BackBtn />
          <TextDefault center bold>
            Skip
          </TextDefault>
        </Row>
        <Separator height={normalize(10)} />
        <TextDefault center bold style={{ fontSize: normalize(20) }}>
          Sign up to EduPrime
        </TextDefault>
        <TextDefault style={{ color: theme.backgroundSecond }}>
          Explore the best courses online with thousands of classes in design,
          business, marketing, and many more.
        </TextDefault>

        <Separator height={normalize(30)} />
        <Row
          full
          direction="column"
          start
          rowGap={20}
          style={{ marginTop: 10 }}
        >
          <Input
            leftIcon={<EmailIcon />}
            placeholder={"Email"}
            onChangeText={(txt) => handleChangeInput("Email", txt)}
            text={userInput.email}
          />

          <Input
            leftIcon={<PersonalIcon />}
            placeholder={"Username"}
            onChangeText={(txt) => handleChangeInput("Username", txt)}
            text={userInput.username}
          />

          <InputPassword
            leftIcon={<LockIcon />}
            placeholder={"Password"}
            onChangeText={(txt) => handleChangeInput("password", txt)}
            text={userInput.password}
          />

          <InputPassword
            leftIcon={<LockIcon />}
            placeholder={"Confirm password"}
            onChangeText={(txt) => handleChangeInput("confirmPassword", txt)}
            text={userInput.confirmPassword}
          />

          <ButtonPrimary
            full
            onPress={handleRegister}
            title={"Register"}
            isLoading={false}
          />
        </Row>

        <Separator height={normalize(10)} />
        <Row
          center
          full
          colGap={10}
          style={{
            marginTop: "auto",
          }}
        >
          <TextDefault style={{ color: theme.background }}>
            You have already an account?
          </TextDefault>
          <TextDefault
            bold
            style={{ color: theme.tabIconSelected }}
            onPress={() => {
              navigate(ROUTE_KEY.LOGIN);
            }}
          >
            Login
          </TextDefault>
        </Row>
        <Separator height={normalize(30)} />
      </Row>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: normalize(1),
    width: "43%",
  },
});
