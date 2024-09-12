import BackBtn from "@components/BackBtn";
import CheckBoxItem from "@components/CheckBox";
import {
  ButtonLink,
  ButtonPrimary,
  Input,
  InputPassword,
} from "@components/index";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import Helper, { EKeyCheck, normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import EmailIcon from "assets/svg/email-icon";
import LockIcon from "assets/svg/lock-icon";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
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
      <Row
        full
        direction="column"
        style={{ flex: 1, paddingHorizontal: 20 }}
        rowGap={10}
        start
      >
        <TextDefault center bold>
          Skip
        </TextDefault>
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
          <TouchableOpacity onPress={() => setIsRemember(!isRemember)}>
            <CheckBoxItem
              checked={isRemember}
              label={"Remember me"}
              onPress={() => setIsRemember(!isRemember)}
            />
          </TouchableOpacity>
          <ButtonLink
            onPress={function (): void {}}
            title={"Forgot password?"}
          />

          <ButtonPrimary
            full
            onPress={handleLogin}
            title={"Log In"}
            isLoading={isLoading}
          />
        </Row>
        <BackBtn />
      </Row>
    </MainLayout>
  );
}
