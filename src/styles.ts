import { normalize } from "@helper/helpers";
import { StyleSheet } from "react-native";

export const styleGlobal = StyleSheet.create({
  icon: {
    width: normalize(25),
    height: normalize(25),
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
    color: "#1F2937",
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

});
