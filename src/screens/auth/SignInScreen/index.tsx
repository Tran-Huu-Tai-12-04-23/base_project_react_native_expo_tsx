import React, { useState } from "react";
import { GestureResponderEvent, Image, Text, View } from "react-native";
import { Button } from "react-native-elements";

import { ESize } from "@common/enums";
import { COLORS } from "@common/index";
import { FInput, FView, FViewLoading } from "@components/index";
import FDismissKeyboard from "@components/views/FDismissKeyboard";
import useLogin from "@hooks/api/auth/useLogin";
import IMGAES from "assets/images";
import Toast from "react-native-toast-message";
import styles from "./styles";

type IState = {
  username: string;
  password: string;
  isShowPassword: boolean;
};

const SignInScreen: React.FC = () => {
  const [state, setState] = useState<IState>({
    username: __DEV__ ? "926" : "",
    password: __DEV__ ? "309JCR" : "",
    isShowPassword: false,
  });
  const { isLoading, error, onLogin } = useLogin();

  const refInput = {
    username: React.createRef<any>(),
    password: React.createRef<any>(),
  };

  const checkPermssionLocation = () => {};

  const onChangeText = (value: string = "", name: string = "") => {
    if (name == "username") {
      setState((prevState) => ({ ...prevState, username: value }));
    } else {
      setState((prevState) => ({ ...prevState, password: value }));
    }
  };

  const login = async (event: GestureResponderEvent) => {
    if (!state.username || !state.password) {
      Toast.show({
        type: "error",
        text1: "Vui lòng điền đầy đủ thông tin",
      });
      return;
    }
    await onLogin({
      username: state.username,
      password: state.password,
    });
  };

  const { username, password, isShowPassword } = state;
  const { widthScreen } = ESize;

  return (
    <FView>
      <FViewLoading isLoading={false}>
        <FDismissKeyboard autoScroll={false}>
          <View style={[styles.container]}>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: "transparent",
              }}
            >
              <Image
                source={IMGAES.logo}
                resizeMode="contain"
                style={{
                  height: widthScreen / 2,
                  width: widthScreen / 2,
                }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: COLORS.black,
                  }}
                >
                  GREENLEAF DRIVER
                </Text>
              </View>
              <View style={{ marginLeft: 20, marginRight: 20 }}>
                <FInput
                  type="circle"
                  autoCapitalize="none"
                  placeholder={"Username"}
                  onChangeText={(value) => onChangeText(value, "username")}
                  returnKeyType={"next"}
                  onSubmitEditing={() => refInput.password.current.focus()}
                  value={username}
                  leftIcon={{
                    type: "font-awesome",
                    name: "user",
                    color: COLORS.primary,
                  }}
                />
              </View>
              <View style={{ marginLeft: 20, marginRight: 20 }}>
                <FInput
                  forwardRef={refInput.password}
                  type="circle"
                  blurOnSubmit={false}
                  placeholder={"Password"}
                  onChangeText={(value) => onChangeText(value, "password")}
                  secureTextEntry={!isShowPassword}
                  value={password}
                  errorMessage={error?.response?.data?.message}
                  leftIcon={{
                    type: "font-awesome",
                    name: "lock",
                    color: COLORS.primary,
                  }}
                  rightIcon={{
                    type: "font-awesome",
                    name: isShowPassword ? "eye" : "eye-slash",
                    color: COLORS.primary,
                    onPress: () =>
                      setState((prevState) => ({
                        ...prevState,
                        isShowPassword: !isShowPassword,
                      })),
                  }}
                />
              </View>
              <View style={{ flex: 2, alignItems: "center" }}>
                <Button
                  loading={isLoading}
                  containerStyle={{
                    width: "85%",
                    backgroundColor: COLORS.primary,
                    borderRadius: 50,
                    height: 60,
                  }}
                  titleStyle={{
                    color: "white",
                  }}
                  buttonStyle={{
                    borderColor: "white",
                    borderWidth: 1,
                    borderRadius: 50,
                    height: 60,
                  }}
                  type="outline"
                  onPress={login}
                  title={"Login"}
                />
              </View>
            </View>
          </View>
        </FDismissKeyboard>
      </FViewLoading>
    </FView>
  );
};

export default SignInScreen;
