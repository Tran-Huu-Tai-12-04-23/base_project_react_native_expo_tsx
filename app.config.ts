import type { ConfigContext, ExpoConfig } from "@expo/config";
import dotenv from "dotenv";

dotenv.config();

const envs = {
  development: {
    EXPO_PUBLIC_APP_VARIANT: "development",
    EXPO_PUBLIC_APP_NAME: "GreenLeaf Driver Dev",
    EXPO_PUBLIC_BUNDLE_ID: "com.greenleafdriver.dev",
    EXPO_PUBLIC_APP_API: "https://greenleaf-api.apetechs.co",
  },
  staging: {
    EXPO_PUBLIC_APP_VARIANT: "staging",
    EXPO_PUBLIC_APP_NAME: "GreenLeaf Driver Stag",
    EXPO_PUBLIC_BUNDLE_ID: "com.greenleafdriver.stag",
    EXPO_PUBLIC_APP_API: "https://greenleaf-api.apetechs.co",
  },
  production: {
    EXPO_PUBLIC_APP_VARIANT: "production",
    EXPO_PUBLIC_APP_NAME: "GreenLeaf Driver Pro",
    EXPO_PUBLIC_BUNDLE_ID: "com.greenleafdriver.pro",
    EXPO_PUBLIC_APP_API: "https://greenleaf-api-prod.apetechs.co",
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

const IOSGoogleServices = {
  staging: "./metadata/ios/GoogleService-Info-staging.plist",
  prod: "./metadata/ios/GoogleService-Info-prod.plist",
  dev: "./metadata/ios/GoogleService-Info-dev.plist",
};

const AndroidGoogleServices = {
  staging: "./metadata/android/google-services-staging.json",
  prod: "./metadata/android/google-services-prod.json",
  dev: "./metadata/android/google-services-dev.json",
};

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    name: EXPO_PUBLIC_APP_NAME,
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
      package: EXPO_PUBLIC_BUNDLE_ID,
      versionCode: 1,
      userInterfaceStyle: "automatic",
    },
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    slug: "greanleaf-driver",
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
    owner: "ape-techs-dev",
    extra: {
      eas: {
        projectId: "e9ae07aa-07dc-4e68-9db5-8e33185d9c27",
      },
    },
    runtimeVersion: "1.0.0",
    updates: {
      enabled: true,
      fallbackToCacheTimeout: 60_000,
      checkAutomatically: "ON_LOAD",
      url: "https://u.expo.dev/e9ae07aa-07dc-4e68-9db5-8e33185d9c27",
    },

    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photo",
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        },
      ],
    ],
  };
};
