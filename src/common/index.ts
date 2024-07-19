import AsyncStorage from "@react-native-async-storage/async-storage";
import IMGAES from "assets/images";
import { Dimensions, Platform, StatusBar } from "react-native";
import COLORS from "./colors/colors";

const { width, height } = Dimensions.get("window");
/**
 retuen iphoneXStyle  when iphone X
*/
const ifIphoneX = (iphoneXStyle: number, regularStyle: number): number => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};
function isIphoneX() {
  const dim = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dim.height === 780 ||
      dim.width === 780 ||
      dim.height === 812 || //iphone X, 12 mini, iphone 11 pro,
      dim.width === 812 ||
      dim.height === 844 || //12 pro
      dim.width === 844 ||
      dim.height === 896 || //iphone 11 pro max
      dim.width === 896 ||
      dim.height === 926 || //iphone 12 pro max
      dim.width === 926)
  );
}
export const deviceWidth = width;
export const deviceHeight = height;
const getStatusBarHeight = (safe?: Boolean): number => {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
};
const isIOS = Platform.OS === "ios";

function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
const normalize = (fontSize, standardScreenHeight = 680) => {
  const standardLength = width > height ? width : height;
  const offset =
    width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight;
  const dvHeight =
    isIphoneX() || Platform.OS === "android"
      ? standardLength - offset
      : standardLength;
  const heightPercent = (fontSize * dvHeight) / standardScreenHeight;
  return Math.round(heightPercent);
};

const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`error storeString ${key}`, e);
  }
};
export {
  COLORS,
  getBottomSpace,
  getStatusBarHeight,
  ifIphoneX,
  IMGAES,
  isIOS,
  isIphoneX,
  normalize,
  storeStringData,
};
