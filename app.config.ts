import { ExpoConfig } from "@expo/config";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const envs = {
  development: {
    EXPO_PUBLIC_APP_VARIANT: "development",
    EXPO_PUBLIC_APP_NAME: "Quiz Wise Dev",
    EXPO_PUBLIC_BUNDLE_ID: "com.genny.quizwise.dev",
    EXPO_PUBLIC_API: "",
    GOOGLE_SERVICE_FILE: "./metadata/google-services-dev.json",
    IOS_SERVICE_FILE: "./metadata/GoogleService-Info-dev.plist",
  },
  production: {
    EXPO_PUBLIC_APP_VARIANT: "production",
    EXPO_PUBLIC_APP_NAME: "Quiz Wise",
    EXPO_PUBLIC_BUNDLE_ID: "com.genny.quizwise.prod",
    EXPO_PUBLIC_API: "",
    GOOGLE_SERVICE_FILE: "./metadata/google-services-pro.json",
    IOS_SERVICE_FILE: "./metadata/GoogleService-Info-pro.plist",
  },
};

const {
  EXPO_PUBLIC_APP_VARIANT,
  EXPO_PUBLIC_APP_NAME,
  EXPO_PUBLIC_BUNDLE_ID,
  GOOGLE_SERVICE_FILE,
  IOS_SERVICE_FILE,
} = envs[(process.env.NODE_ENV as keyof typeof envs) || "production"];

if (!EXPO_PUBLIC_BUNDLE_ID) {
  throw new Error("EXPO_PUBLIC_BUNDLE_ID is not defined");
}

if (!EXPO_PUBLIC_APP_NAME) {
  throw new Error("EXPO_PUBLIC_APP_NAME is not defined");
}

if (!EXPO_PUBLIC_APP_VARIANT) {
  throw new Error("EXPO_PUBLIC_APP_VARIANT is not defined");
}

if (!fs.existsSync(IOS_SERVICE_FILE)) {
  throw new Error(`iOS service file not found: ${IOS_SERVICE_FILE}`);
}

if (!fs.existsSync(GOOGLE_SERVICE_FILE)) {
  throw new Error(`Google service file not found: ${GOOGLE_SERVICE_FILE}`);
}

export default (): ExpoConfig => ({
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  name: EXPO_PUBLIC_APP_NAME,
  slug: "quizwise",
  version: "1.0.1",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "transparent",
  },
  assetBundlePatterns: ["**/*"],
  web: {
    favicon: "./assets/favicon.png",
  },
  owner: "huutaidev",
  extra: {
    eas: {
      projectId: "9bf9c2f3-db18-4981-83a6-4ffa2fd97ac9",
    },
  },
  runtimeVersion: "1.0.0",
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 60_000,
    checkAutomatically: "ON_LOAD",
    url: "https://u.expo.dev/9bf9c2f3-db18-4981-83a6-4ffa2fd97ac9",
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
    googleServicesFile: IOS_SERVICE_FILE,
    entitlements: {
      "aps-environment": "production",
    },
  },
  android: {
    versionCode: 1,
    package: EXPO_PUBLIC_BUNDLE_ID,
    userInterfaceStyle: "automatic",
    permissions: ["INTERNET", "ACCESS_NETWORK_STATE", "WAKE_LOCK"],
    googleServicesFile: GOOGLE_SERVICE_FILE,
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    [
      "expo-secure-store",
      {
        faceIDPermission:
          "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
      },
    ],
    [
      "expo-font",
      {
        fonts: ["./assets/fonts/Roboto.ttf"],
      },
    ],
  ],
});
