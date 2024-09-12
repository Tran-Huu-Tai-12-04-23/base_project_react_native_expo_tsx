import * as SecureStore from "expo-secure-store";
import { Platform, StatusBar } from "react-native";
import { ACCESS_TOKEN, USER_LOGIN } from "./keys";
import { deviceHeight, deviceWidth, isIphoneX } from "./utils";

export const config = {
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTitleStyle: {
    color: "white",
  },
  headerTintColor: "#fff",
  tabBarVisible: false,
  headerBackTitleVisible: false,
};

export enum EKeyCheck {
  STRING,
  THAN_ZERO,
  THAN_EQ_ZERO,
  LESS_ZERO,
  LESS_EQ_ZERO,
}
interface TypeCheck {}

export const normalize = (fontSize: number, standardScreenHeight = 680) => {
  const standardLength =
    deviceWidth > deviceHeight ? deviceWidth : deviceHeight;
  const offset =
    deviceWidth > deviceHeight
      ? 0
      : Platform.OS === "ios"
      ? 78
      : StatusBar.currentHeight;
  const dvHeight =
    isIphoneX() || Platform.OS === "android"
      ? standardLength - (offset || 0)
      : standardLength;
  const heightPercent = (fontSize * dvHeight) / standardScreenHeight;
  return Math.round(heightPercent);
};

const Helper = {
  formatVND: (money: number, prefix = "VNĐ") => {
    return new Intl.NumberFormat("vi-VN").format(money || 0) + " " + prefix;
  },
  saveToken: async (value: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN, value);
  },
  saveUserLoginData: async (value: { username: string; password: string }) => {
    await SecureStore.setItemAsync(USER_LOGIN, JSON.stringify(value));
  },
  getUserLoginData: async () => {
    return await SecureStore.getItemAsync(USER_LOGIN);
  },
  getToken: async () => {
    let result = await SecureStore.getItemAsync(ACCESS_TOKEN);
    return result;
  },
  clearDataLogin: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(USER_LOGIN);
  },

  verifyField: (object: any, checkType: EKeyCheck[]) => {
    let missingFiled: string[] = [];
    Object.keys(object).map((key) => {
      if (checkType.includes(EKeyCheck.STRING) && !object[key]) {
        missingFiled.push(key);
      }
    });
    return missingFiled;
  },
};

export default Helper;
function dayjs(text: Date) {
  throw new Error("Function not implemented.");
}
