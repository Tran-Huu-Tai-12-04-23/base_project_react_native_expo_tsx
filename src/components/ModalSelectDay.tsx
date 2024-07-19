import { COLORS, deviceWidth, getBottomSpace, normalize } from "@common/index";
import { IconFontAwesome } from "@helpers/deflibs";
import moment from "moment";
import React, { FC, forwardRef, useImperativeHandle, useState } from "react";
import {
  ImageBackground,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
// import CalendarPicker from "react-native-calendar-picker";
import NTText from "./texts/FText";

type ChildProps = {
  containStyle?: ViewStyle;
  onDateSelect: Function;
  currentDate?: Date;
  isPickOne?: boolean;
  ref?: any;
  mindate?: Date;
  /**
   * when isShow == false view item will hide, default is true
   */
  isShow?: boolean;
};

const ModalSelectDay: FC<ChildProps> = forwardRef((props, ref): JSX.Element => {
  const {
    containStyle = {},
    onDateSelect = () => {},
    isShow = true,
    isPickOne = false,
    mindate,
  } = props;
  useImperativeHandle(ref, () => ({
    selectTime,
  }));
  const [timeSelect, setTime] = useState<any>(null);
  const [isModalCalendar, setModalCalendar] = useState(false);

  const selectTime = () => setModalCalendar(true);
  const handleSelect = () => {
    onDateSelect(timeSelect);
    setModalCalendar(false);
  };
  const handleCancel = async () => {
    setTime(new Date());
    onDateSelect({
      selectedStartDate: new Date(),
      selectedEndDate: new Date(),
    });
    setModalCalendar(false);
  };
  const customDayHeaderStylesCallback = (date: { dayOfWeek: number }) => {
    if (date.dayOfWeek === 7) {
      return {
        textStyle: { color: "#cB89744" },
      };
    }
  };
  const _customDatesStyles = (data: moment.MomentInput) => {
    if (moment(data, "DD-MM-YYYY").isoWeekday() === 7) {
      return {
        textStyle: { color: "#cB89744" },
      };
    }
  };

  const handleChangeDate = (date: moment.MomentInput, type: string) => {
    if (isPickOne) {
      onDateSelect(date);
      setTimeout(() => {
        setModalCalendar(false);
      }, 200);
    } else {
      let temp = { ...timeSelect };
      if (type === "END_DATE") {
        temp = { ...timeSelect, selectedStartDate: date };
      } else {
        temp = { ...timeSelect, selectedEndDate: date };
      }
      if (date) setTime(temp);
    }
  };
  const _modalCalendar = () => {
    return (
      <Modal
        visible={isModalCalendar}
        animationType={"slide"}
        transparent={true}
        supportedOrientations={[
          "portrait",
          "portrait-upside-down",
          "landscape",
          "landscape-left",
          "landscape-right",
        ]}
      >
        <View style={{ flex: 1, flexGrow: 1 }}>
          <TouchableOpacity
            onPress={handleCancel}
            style={{ flex: 1, flexGrow: 1 }}
          >
            <ImageBackground source={{}} style={[styles.bgStyle]} />
          </TouchableOpacity>
          <View style={{ position: "absolute", bottom: 0 }}>
            <View style={styles.flexStart}>
              <CalendarPicker
                onDateChange={handleChangeDate}
                monthYearHeaderWrapperStyle={{
                  flex: 1,
                  justifyContent: "flex-start",
                }}
                startFromMonday={true}
                previousTitle={"<"}
                nextTitle={">"}
                scrollable={false}
                minDate={mindate}
                weekdays={["HAI", "BA", "TƯ", "NĂM", "SÁU", "BẢY", "CN"]}
                selectedDayStyle={{ backgroundColor: COLORS.primary }}
                customDayHeaderStyles={customDayHeaderStylesCallback}
                dayLabelsWrapper={{
                  borderStyle: "dashed",
                  borderWidth: normalize(1),
                  width: deviceWidth,
                }}
                selectedDayTextColor={COLORS.white}
                textStyle={{ fontWeight: "600", fontSize: normalize(13) }}
                customDatesStyles={_customDatesStyles}
                months={[
                  "Tháng 1 -",
                  "Tháng 2 -",
                  "Tháng 3 -",
                  "Tháng 4 -",
                  "Tháng 5 -",
                  "Tháng 6 -",
                  "Tháng 7 -",
                  "Tháng 8 -",
                  "Tháng 9 -",
                  "Tháng 10 -",
                  "Tháng 11 -",
                  "Tháng 12 -",
                ]}
                selectYearTitle={""}
                allowRangeSelection={!isPickOne}
                selectedDayColor={COLORS.primary}
                showDayStragglers={true}
                yearTitleStyle={{ fontWeight: "700", fontSize: normalize(16) }}
                monthTitleStyle={{ fontWeight: "700", fontSize: normalize(16) }}
              />
            </View>
            {isPickOne ? null : (
              <View style={styles.bottomView}>
                <TouchableOpacity
                  onPress={handleSelect}
                  style={styles.bottomButton}
                >
                  <NTText h4 w600 txtStyle={{ color: "white" }}>
                    {"Chọn xong"}
                  </NTText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={[styles.bottomButton, { backgroundColor: "#484848" }]}
                >
                  <NTText h4 w600 txtStyle={{ color: "white" }}>
                    {"Bỏ chọn"}
                  </NTText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };
  if (isShow)
    return (
      <View style={[styles.containt, containStyle]}>
        {isPickOne ? null : (
          <TouchableOpacity onPress={selectTime} style={styles.inputDate}>
            <NTText h56 w500>
              {timeSelect
                ? `${moment(timeSelect?.selectedEndDate).format(
                    "DD/MM"
                  )} -  ${moment(timeSelect?.selectedStartDate).format(
                    "DD/MM"
                  )}`
                : "Chọn ngày"}
            </NTText>
            <IconFontAwesome
              name={"calendar"}
              size={normalize(14)}
              onPress={selectTime}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
        {_modalCalendar()}
      </View>
    );
  else return <>{_modalCalendar()}</>;
});

export default ModalSelectDay;

const styles = StyleSheet.create({
  containt: {
    marginVertical: normalize(10),
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bgStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    opacity: 0.6,
    marginBottom: -normalize(20),
    justifyContent: "center",
    alignItems: "center",
  },
  inputDate: {
    ...Platform.select({
      ios: {
        shadowOffset: { height: 3.5, width: -2.5 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
    width: "100%",
    borderWidth: normalize(1),
    marginRight: normalize(10),
    paddingHorizontal: normalize(10),
    // paddingVertical: normalize(2),
    backgroundColor: "white",
    height: normalize(25),
    borderRadius: normalize(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: COLORS.primary,
  },
  flexStart: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: deviceWidth,
    backgroundColor: COLORS.white,
    paddingBottom: getBottomSpace() + normalize(20),
    paddingTop: normalize(10),
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
  },
  bottomView: {
    flexDirection: "row",
    borderTopWidth: normalize(1),
    borderTopColor: COLORS.grayf2f2f2,
    backgroundColor: COLORS.white,
    width: deviceWidth,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: normalize(10),
    paddingBottom: getBottomSpace() + normalize(10),
  },
  bottomButton: {
    ...Platform.select({
      ios: {
        shadowOffset: { height: 3.5, width: -2.5 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
    width: deviceWidth * 0.4,
    height: normalize(40),
    borderRadius: normalize(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
});
