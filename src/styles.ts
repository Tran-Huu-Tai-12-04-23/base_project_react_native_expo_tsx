import { normalize } from "@helper/helpers";
import { Platform, StyleSheet } from "react-native";

export const styleGlobal = StyleSheet.create({
  icon: {
    width: normalize(25),
    height: normalize(25),
  },
  cardItem: {
    width: normalize(60),
    height: normalize(60),
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  border: { borderWidth: 1, borderStyle: "solid" },
  borderTop: {
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  text: {
    fontSize: normalize(12),
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: normalize(20),
    fontWeight: "bold",
  },
  separator: {
    height: 1,
  },
  centerChild: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  shadow: {
    margin: 2,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: Platform.OS === "android" ? 2 : undefined,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#F86F6F",
    borderRadius: 100,
    zIndex: 10000,
    width: normalize(20),
    height: normalize(20),
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
