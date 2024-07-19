import OSConfig from "@common/constants/OSConfig";
import { COLORS, deviceWidth } from "@common/index";
import CustomBottomSheet from "@components/CustomBottomSheet";
import { Row } from "@components/index";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

type DateTimePickerBottomSheetInfoType = {
  content: ReactNode | null;
  snapPoints: any;
};
const DateTimePickerBottomSheetContext = createContext<{
  openDatetimePickerBottomSheet: (mode: "date" | "time" | "datetime") => void;
  hideDateTimePickerBottomSheet: () => void;
}>({
  hideDateTimePickerBottomSheet: () => {},
  openDatetimePickerBottomSheet: () => {},
});

const DateTimePickerBottomSheetProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dateTimePickerBottomSheetRef = useRef<BottomSheet>(null);
  const [mode, setMode] = useState<"date" | "time" | "datetime">("date");
  const openDateTimePickerBottomSheet = (
    mode: "date" | "time" | "datetime"
  ) => {
    setMode(mode);
    dateTimePickerBottomSheetRef.current?.expand();
  };

  const hideDateTimePickerBottomSheet = () => {
    dateTimePickerBottomSheetRef.current?.close();
  };

  const value = useMemo(
    () => ({
      openDatetimePickerBottomSheet: openDateTimePickerBottomSheet,
      hideDatetimePickerBottomSheet: hideDateTimePickerBottomSheet,
    }),
    [hideDateTimePickerBottomSheet, openDateTimePickerBottomSheet]
  );

  const typeOfPicker = useMemo(() => {
    if (mode === "time") {
      return "spinner";
    }
    if (mode === "date" && OSConfig.OS_ENV === "ios") {
      return "inline";
    } else if (mode === "date" && OSConfig.OS_ENV === "android") {
      return "calendar";
    }
    return "default";
  }, [mode]);

  return (
    <DateTimePickerBottomSheetContext.Provider value={value as any}>
      {children}
      <CustomBottomSheet
        onClose={hideDateTimePickerBottomSheet}
        onOpen={hideDateTimePickerBottomSheet}
        onSetSnapPoints={() => {}}
        snapPoints={[400]}
        ref={dateTimePickerBottomSheetRef}
      >
        <Row
          style={{ padding: 10, flex: 1 }}
          direction="column"
          full
          rowGap={10}
        >
          <RNDateTimePicker
            onChange={(ev, date) => {}}
            mode={mode as "date"}
            themeVariant="light"
            value={new Date()}
            display={typeOfPicker}
            style={styles.container}
          />

          <Button
            title="Xác nhận"
            onPress={() => hideDateTimePickerBottomSheet()}
            buttonStyle={{
              width: deviceWidth - 20,
              borderRadius: 100,
              backgroundColor: COLORS.primary,
            }}
            type="solid"
          />
          <Button
            title="Đóng"
            onPress={() => hideDateTimePickerBottomSheet()}
            buttonStyle={{
              width: deviceWidth - 20,
              borderRadius: 100,
              backgroundColor: COLORS.redColor,
              marginBottom: 20,
            }}
            type="solid"
          />
        </Row>
      </CustomBottomSheet>
    </DateTimePickerBottomSheetContext.Provider>
  );
};

export const useDateTimePickerBottomSheet = () => {
  const context = useContext(DateTimePickerBottomSheetContext);

  if (context == null) {
    throw new Error(
      "useDateTimePickerBottomSheet must be used within a AuthProvider"
    );
  }

  return context;
};
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

export default DateTimePickerBottomSheetProvider;
