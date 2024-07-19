import COLORS from "@common/colors/colors";
import { Platform, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const stylesApp = StyleSheet.create({
  frmContent: {
    height: 150,
    borderColor: Colors.bgGray,
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  frmButton: {
    marginHorizontal: 10,
    width: 300,
    marginTop: 10,
    borderRadius: 25,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetWeen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colBetween: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  titleStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  // text
  txtLargeBold: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.black,
  },
  txt: {
    fontSize: 16,
    color: COLORS.black,
  },
  txtBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  txtMedium: {
    fontSize: 14,
    color: COLORS.black,
  },
  txtMediumBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  txtSmall: {
    fontSize: 13,
    color: COLORS.black,
  },
  txtSmallBold: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.black,
  },
  txtErr: {
    fontSize: 12,
    color: "red",
  },
  ///
  // margin
  mgTop5: {
    marginTop: 5,
  },
  mgTop10: {
    marginTop: 10,
  },
  mgTop20: {
    marginTop: 20,
  },
  mgTop50: {
    marginTop: 50,
  },
  mgLeft10: {
    marginLeft: 10,
  },
  mgLeft20: {
    marginLeft: 20,
  },
  mgBottom10: {
    marginBottom: 10,
  },
  mgBottom20: {
    marginBottom: 20,
  },
  mgRight10: {
    marginRight: 10,
  },
  mgRight20: {
    marginRight: 20,
  },
  ///

  frameSchedule: {
    width: 250,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  errStyle: {
    fontWeight: "400",
    fontSize: 12,
    color: "red",
  },
  btnSaveDiary: {
    borderRadius: 45,
    width: "40%",
  },
  frameCheckedDiary: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
    margin: 3,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.41,
    elevation: Platform.OS === "android" ? 2 : undefined,
    borderLeftColor: COLORS.primary,
  },
});

export default stylesApp;
