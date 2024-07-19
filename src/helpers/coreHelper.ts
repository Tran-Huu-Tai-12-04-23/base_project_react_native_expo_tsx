import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeysEnum } from "./key";

class CoreHelper {
  public static async clearDataLogin() {
    await AsyncStorage.removeItem(KeysEnum.AC_TOKEN);
    await AsyncStorage.removeItem(KeysEnum.FCM_TOKEN);
  }

  public static async saveAcToken(token: string) {
    await AsyncStorage.setItem(KeysEnum.AC_TOKEN, token);
  }

  public static async getAcToken() {
    return await AsyncStorage.getItem(KeysEnum.AC_TOKEN);
  }

  public static async saveFcmToken(token: string) {
    await AsyncStorage.setItem(KeysEnum.FCM_TOKEN, token);
  }

  public static async getFcmToken() {
    return await AsyncStorage.getItem(KeysEnum.FCM_TOKEN);
  }

  public static formatDateTime(date: Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
}

export default CoreHelper;
