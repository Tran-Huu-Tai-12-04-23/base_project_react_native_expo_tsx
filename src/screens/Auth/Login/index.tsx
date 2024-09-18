import BackBtn from "@components/BackBtn";
import CheckBoxItem from "@components/CheckBox";
import EffectBackgroundView from "@components/EffectBackgroundView";
import {
  ButtonOutlined,
  ButtonPrimary,
  Input,
  InputPassword,
} from "@components/index";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import Helper, { EKeyCheck, normalize } from "@helper/helpers";
import { deviceHeight } from "@helper/utils";
import MainLayout from "@layout/MainLayout";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import AppleIcon from "assets/svg/apple-icon";
import EmailIcon from "assets/svg/email-icon";
import FacebookIcon from "assets/svg/facebook-icon";
import GoogleIcon from "assets/svg/google-icon";
import LockIcon from "assets/svg/lock-icon";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import useLogin from "src/services/hooks/auth/useLogin";

interface LoginBody {
  username: string;
  password: string;
}
export default function LoginScreen() {
  const { theme } = useTheme();
  const [isRemember, setIsRemember] = useState(false);
  const [userInput, setUserInput] = useState<LoginBody>({
    username: "",
    password: "",
  });
  const { onLogin, isLoading } = useLogin();
  const handleSubmit = async (body: LoginBody) => {
    await onLogin(body).then(async (res) => {
      if (!res) return;
      Toast.show({
        type: "success",
        text1: "Login successfully!",
      });
      if (isRemember) {
        await Helper.saveUserLoginData(userInput);
      }
    });
  };
  const handleLogin = async () => {
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, minHeight: deviceHeight }}
      >
        <Separator height={normalize(40)} />
        <Row
          full
          direction="column"
          style={{ flex: 1, paddingHorizontal: 20 }}
          rowGap={10}
          start
        >
          <Row full between>
            <BackBtn />
            <TextDefault center bold>
              Skip
            </TextDefault>
          </Row>
          <Separator height={normalize(10)} />
          <TextDefault center bold style={{ fontSize: normalize(20) }}>
            Hi! Welcome Back
          </TextDefault>
          <TextDefault center style={{ color: theme.backgroundSecond }}>
            Let’s get you in to EduPrime
          </TextDefault>

          <Separator height={normalize(10)} />
          <Row
            full
            direction="column"
            start
            rowGap={20}
            style={{ marginTop: 10 }}
          >
            <Input
              leftIcon={<EmailIcon />}
              placeholder={"Username"}
              onChangeText={(txt) => handleChangeInput("username", txt)}
              text={userInput.username}
            />
            <InputPassword
              leftIcon={<LockIcon />}
              placeholder={"Password"}
              onChangeText={(txt) => handleChangeInput("password", txt)}
              text={userInput.password}
            />
            <Row between full>
              <TouchableOpacity onPress={() => setIsRemember(!isRemember)}>
                <CheckBoxItem
                  checked={isRemember}
                  label={"Remember me"}
                  onPress={() => setIsRemember(!isRemember)}
                />
              </TouchableOpacity>
              <TextDefault bold style={{ color: theme.primary }}>
                Forgot Password?
              </TextDefault>
            </Row>

            <ButtonPrimary
              full
              onPress={handleLogin}
              title={"Sign In"}
              isLoading={isLoading}
            />
          </Row>

          <Separator height={normalize(10)} />
          <Row center colGap={10} style={{ marginHorizontal: normalize(20) }}>
            <View
              style={[
                styles.spacing,
                { backgroundColor: theme.backgroundSecond },
              ]}
            />
            <TextDefault style={{ color: theme.backgroundSecond }}>
              Or
            </TextDefault>
            <View
              style={[
                styles.spacing,
                { backgroundColor: theme.backgroundSecond },
              ]}
            />
          </Row>
          <Separator height={normalize(10)} />
          <Row direction="column" full center rowGap={10}>
            <ButtonOutlined
              iconLeft={<GoogleIcon />}
              borderColor={theme.icon}
              round={10}
              full
              title="Sign in with Google"
              onPress={function (): void {}}
            />
            <ButtonOutlined
              iconLeft={<AppleIcon />}
              borderColor={theme.icon}
              round={10}
              full
              title="Sign in with Apple"
              onPress={function (): void {}}
            />
            <ButtonOutlined
              iconLeft={<FacebookIcon />}
              borderColor={theme.icon}
              round={10}
              full
              title="Sign in with Facebook"
              onPress={function (): void {}}
            />
          </Row>
          <Separator height={normalize(10)} />

          <Separator height={normalize(30)} />

          <Row
            center
            full
            colGap={10}
            style={{
              marginTop: "auto",
            }}
          >
            <TextDefault style={{ color: theme.background }}>
              Don't have an account?
            </TextDefault>
            <TextDefault
              bold
              style={{ color: theme.tabIconSelected }}
              onPress={() => {
                navigate(ROUTE_KEY.REGISTER);
              }}
            >
              Register
            </TextDefault>
          </Row>
        </Row>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: normalize(1),
    width: "43%",
  },
});
