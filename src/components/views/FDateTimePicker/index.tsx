import { COLORS } from "@common/index";
import NTText from "@components/texts/FText";
import { useDateTimePickerBottomSheet } from "@context/dateTimePickerBottomSheet";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Row from "../FView/Row";
type Props = {
  mode: "date" | "time" | "datetime";
};
function FDatetimePicker({ mode }: Props) {
  const { openDatetimePickerBottomSheet } = useDateTimePickerBottomSheet();

  return (
    <Fragment>
      <TouchableOpacity
        style={[styles.input]}
        onPress={() => {
          openDatetimePickerBottomSheet("time");
        }}
      >
        <Row full between>
          <NTText
            h5
            h5Style={{ fontSize: 12, color: COLORS.grayBDBDBD }}
          ></NTText>
          {mode === "time" && (
            <MaterialCommunityIcons
              name="clock-time-eight-outline"
              size={24}
              color="black"
            />
          )}
          {mode === "date" && (
            <Entypo name="calendar" size={24} color="black" />
          )}
        </Row>
      </TouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    flex: 1,
  },
});

export default FDatetimePicker;
