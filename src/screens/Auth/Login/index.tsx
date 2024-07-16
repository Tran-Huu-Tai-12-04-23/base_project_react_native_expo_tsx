import BackBtn from "@components/BackBtn";
import CheckBoxItem from "@components/CheckBox";
import {
  ButtonLink,
  ButtonPrimary,
  Input,
  InputPassword,
} from "@components/index";
import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import Helper, { EKeyCheck } from "@helper/helpers";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import useLogin from "src/services/hooks/auth/useLogin";
import { styleGlobal } from "src/styles";

interface LoginBody {
  username: string;
  password: string;
}
export default function LoginScreen() {
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
    <SafeAreaView style={styleGlobal.container}>
      <Row
        full
        direction="column"
        style={{ flex: 1, paddingHorizontal: 20 }}
        rowGap={10}
      >
        <TextDefault center bold style={{ fontSize: 20 }}>
          Welcome Back!
        </TextDefault>
        <TextDefault center>We're so excited to see you again!</TextDefault>
        <Row full direction="column" start rowGap={8} style={{ marginTop: 10 }}>
          <TextDefault bold style={{ fontSize: 12 }}>
            Account information
          </TextDefault>
          <Input
            placeholder={"Username"}
            onChangeText={(txt) => handleChangeInput("username", txt)}
            text={userInput.username}
          />
          <InputPassword
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
    </SafeAreaView>
  );
}
