import { ExpoConfig } from "@expo/config";
import dotenv from "dotenv";

dotenv.config();

const envs = {
  development: {
    EXPO_PUBLIC_APP_VARIANT: "development",
    EXPO_PUBLIC_APP_NAME: "Life Manager Dev",
    EXPO_PUBLIC_BUNDLE_ID: "com.genny.LifeManager.dev",
    EXPO_PUBLIC_API: "",
  },
  production: {
    EXPO_PUBLIC_APP_VARIANT: "production",
    EXPO_PUBLIC_APP_NAME: "Life Manager",
    EXPO_PUBLIC_BUNDLE_ID: "com.genny.LifeManager.prod",
    EXPO_PUBLIC_API: "",
  },
};

const { EXPO_PUBLIC_APP_VARIANT, EXPO_PUBLIC_APP_NAME, EXPO_PUBLIC_BUNDLE_ID } =
  envs[(process.env.NODE_ENV as keyof typeof envs) || "production"];

if (EXPO_PUBLIC_BUNDLE_ID == null) {
  throw new Error("EXPO_PUBLIC_BUNDLE_ID is not defined");
}

if (EXPO_PUBLIC_APP_NAME == null) {
  throw new Error("EXPO_PUBLIC_APP_NAME is not defined");
}

if (EXPO_PUBLIC_APP_VARIANT == null) {
  throw new Error("EXPO_PUBLIC_APP_VARIANT is not defined");
}

export default (): ExpoConfig => ({
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  name: EXPO_PUBLIC_APP_NAME,
  slug: "life-manager-app",
  version: "1.0.1",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  web: {
    favicon: "./assets/favicon.png",
  },
  owner: "huutaidev",
  extra: {
    eas: {
      projectId: "1efe9236-bb07-4bcd-9113-944577a66809",
    },
  },
  runtimeVersion: "1.0.0",
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 60_000,
    checkAutomatically: "ON_LOAD",
    url: "https://u.expo.dev/1efe9236-bb07-4bcd-9113-944577a66809",
  },
  ios: {
    bundleIdentifier: EXPO_PUBLIC_BUNDLE_ID,
    buildNumber: "1",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    versionCode: 1,
    package: EXPO_PUBLIC_BUNDLE_ID,
    userInterfaceStyle: "automatic",
  },
  plugins: [
    [
      "expo-secure-store",
      {
        faceIDPermission:
          "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
      },
    ],
  ],
});
