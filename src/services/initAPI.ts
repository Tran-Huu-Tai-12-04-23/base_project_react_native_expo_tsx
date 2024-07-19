import CoreHelper from "@helpers/coreHelper";
import { KeysEnum } from "@helpers/key";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

const initApi = (url?: string, headers = {}) => {
  if (url == null) throw new Error("URL is required");
  const api = axios.create({
    baseURL: url,
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      ...headers,
    },
  });

  api.interceptors.request.use(async (config: any) => {
    try {
      const token = await AsyncStorage.getItem(KeysEnum.AC_TOKEN);
      if (token != null) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("AsyncStorage error:", error);
    }
    return config;
  });

  api.interceptors.response.use(
    (response: any) => response,
    (error: {
      config: {
        headers: { Authorization: any };
        baseURL: string;
        url: string;
        data: any;
      };
    }) => {
      // Accessing the URL and the body of the request
      console.log("\x1b[31m", error.config?.headers?.Authorization);

      if (error.config?.headers?.Authorization) {
        Toast.show({
          type: "error",
          text1: "Hết phiên đăng nhập!Vui lòng đăng nhập lại!",
        });

        CoreHelper.clearDataLogin();
      }
      console.log(
        "\x1b[31m",
        "ERROR REQUEST URL:",
        error.config?.baseURL + "/" + error.config.url
      );
      console.log("\x1b[31m", "ERROR REQUEST BODY:", error.config.data);

      return Promise.reject(error);
    }
  );

  return api;
};

export default initApi;
