import * as SecureStore from "expo-secure-store";
import { Appearance } from "react-native";
const KEY_THEM = "THEME";
export enum ETheme {
  "DARK" = "DARK",
  "LIGHT" = "LIGHT",
  "SYSTEM" = "SYSTEM",
}

export const useThemeUtil = () => {
  async function save(value: ETheme) {
    await SecureStore.setItemAsync(KEY_THEM, value);
  }

  async function getValueFor() {
    let result = await SecureStore.getItemAsync(KEY_THEM);
    return result;
  }
  return {
    onSaveTheme: (value: ETheme) => {
      save(value);
    },
    onGetSystemTheme: () => Appearance.getColorScheme(),
    onGetTheme: async () => {
      return await getValueFor();
    },
  };
};
