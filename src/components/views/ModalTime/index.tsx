import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

interface props {
  testID: string;
  mode: "date" | "time" | "datetime";
  show: boolean;
  time: Date;
  minimumDate?: Date;
  cancel: () => void;
  onChangeTime: (val: Date) => void;
}

function ModalTimePicker({ mode = "datetime" }: props) {
  return <RNDateTimePicker mode={mode} value={new Date()} />;
}

export default ModalTimePicker;
