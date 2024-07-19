import moment, { Moment } from "moment";
import React, { FC, useState } from "react";
import {
  ImageBackground,
  ListRenderItemInfo,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { FlatList } from "react-native-gesture-handler";
import { Utils } from "~/@helpers/utils";
import { deviceWidth, getBottomSpace, normalize } from "~/common";
import COLORS from "~/common/colors/colors";
import NTText from "~/components/texts/FText";
import EmptyList from "~/components/views/EmptyList";
import FShadowView from "~/components/views/FShadowView";
import Row from "~/components/views/FView/Row";
import Skeleton from "~/components/views/Skeleton";
import {
  BodyCustomer,
  HistoryDTO,
  ScheduleDTO,
} from "~/modules/workDiary/work.diary.dto";
import { IScreenProps } from "~/screens/shared/interface";
import { ICommonProps } from "~/stores";
import { WorkDiaryStore } from "~/stores/workDiary/work.diary.store";

interface IProps extends IScreenProps, ICommonProps {
  workDiaryStore?: WorkDiaryStore;
  schedule?: ScheduleDTO;
  onSelectTime?: (data) => {};
  loaddingHis: number;
  dataHis: { [key: string]: Array<HistoryDTO> } | null;
  dataHisPass: {
    __cusEmp__: BodyCustomer;
    __histories__: HistoryDTO[];
    id: string;
    cusEmpId: string;
  }[];
}

const History: FC<IProps> = (props) => {
  const { dataHisPass, onSelectTime, loaddingHis, dataHis } = props;
  const [isModalDate, setModalDate] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  // EFFECT

  // ACTION
  const cancelModal = () => setModalDate(false);
  const handleSelectTime = () => {
    onSelectTime({ dateFrom, dateTo });
    setModalDate(false);
  };
  const handleChangeDate = (date: Moment, type: "START_DATE" | "END_DATE") => {
    if (type === "END_DATE") {
      setDateTo(date.toDate());
    } else {
      setDateFrom(date.toDate());
    }
  };
  const onRefresh = () => {
    onSelectTime({ dateFrom, dateTo });
  };

  // RENDER
  const modalTime = () => {
    const customDayHeaderStylesCallback = (date: { dayOfWeek: number }) => {
      if (date.dayOfWeek === 7) {
        return {
          textStyle: { color: COLORS.primary },
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
    return (
      <Modal
        visible={isModalDate}
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
            onPress={cancelModal}
            style={{ flex: 1, flexGrow: 1 }}
          >
            <ImageBackground source={{}} style={styles.bgStyle} />
          </TouchableOpacity>
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
              maxDate={new Date()}
              weekdays={["HAI", "BA", "TƯ", "NĂM", "SÁU", "BẢY", "CN"]}
              selectedDayStyle={{ backgroundColor: "#B89744" }}
              customDayHeaderStyles={customDayHeaderStylesCallback}
              dayLabelsWrapper={{
                borderStyle: "dashed",
                borderWidth: 1,
                width: deviceWidth,
              }}
              selectedDayTextColor={COLORS.white}
              textStyle={{ fontWeight: "600", fontSize: 13 }}
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
              allowRangeSelection={true}
              selectedDayColor={COLORS.primary}
              showDayStragglers={true}
              yearTitleStyle={{
                color: "#cB89744",
                fontWeight: "700",
                fontSize: 15,
              }}
              monthTitleStyle={{
                color: "#cB89744",
                fontWeight: "700",
                fontSize: 15,
              }}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={handleSelectTime}
            style={styles.bottomButton}
          >
            <Text style={{ color: "white" }}>{"Chọn xong"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={cancelModal}
            style={[styles.bottomButton, { backgroundColor: "#484848" }]}
          >
            <Text style={{ color: "white" }}>{"Bỏ chọn"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const headerSearch = () => {
    return (
      <View>
        <Text style={{ color: COLORS.black }}>{"Ngày xem hợp đồng"}</Text>
        <TouchableOpacity
          style={styles.selectTimeBtn}
          onPress={() => setModalDate(true)}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 12, color: COLORS.black }}
          >
            {moment(dateFrom).format("DD/MM/YYYY")}
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 12, color: COLORS.black }}
          >
            {moment(dateTo).format("DD/MM/YYYY")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const _renderContaint = () => {
    switch (loaddingHis) {
      case 1:
        return (
          <View style={{ height: "100%", flex: 1 }}>
            <FlatList
              style={{ marginTop: 10 }}
              data={Object.keys(dataHis)}
              extraData={Object.keys(dataHis)}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={headerSearch()}
              keyExtractor={(_, index) => index.toString()}
              ListEmptyComponent={<EmptyList />}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => onRefresh()}
                  colors={[COLORS.primary]}
                  tintColor={COLORS.primary}
                />
              }
            />
          </View>
        );
      case -1:
        return (
          <View style={{ height: "100%" }}>
            <Text>{"Có lỗi xãy ra"}</Text>
          </View>
        );
      default:
        return (
          <Skeleton loading={true}>
            <View style={{ width: 250, height: 30, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 100, height: 30, borderRadius: 4 }}
            />
          </Skeleton>
        );
    }
  };
  const renderItem = (info: ListRenderItemInfo<any>) => {
    const { item, index } = info;
    const containt = (keyTime: string) => {
      //list item by type
      if (keyTime.indexOf("arrival") > -1) {
        return (
          <ContaintHis
            list={dataHis?.[item]?.[keyTime].slice(0, 1)}
            title={"Đến Điểm Đón"}
          />
        );
      } else if (keyTime.indexOf("pickUp") > -1) {
        let listCus = dataHisPass.filter(
          (val) =>
            val?.__histories__.length > 0 &&
            val?.__histories__.some(
              (his) => his.id == dataHis?.[item]?.[keyTime][0].id
            )
        );
        return (
          <ContaintHis list={dataHis?.[item]?.[keyTime]} title={"Nhận Khách"}>
            <View>
              <View style={{ marginBottom: normalize(5) }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    flex: 1,
                    fontSize: 15,
                    color: COLORS.black,
                  }}
                >
                  {dataHis?.[item]?.[keyTime][0]?.description
                    ? dataHis?.[item]?.[keyTime][0]?.description
                        .replace("<br>", "\n")
                        .split("Bao gồm")[0]
                    : ""}
                </Text>
                <Text
                  style={{ fontSize: 12, color: COLORS.black, paddingTop: 5 }}
                >
                  {Utils.pipeDate(
                    dataHis?.[item]?.[keyTime][0]?.createdAt,
                    "HH:mm:ss DD/MM/YYYY"
                  )}
                </Text>
              </View>
              {listCus.map((item, index) => (
                <View key={index} style={styles.lableCus}>
                  <NTText h6>
                    {!!item?.passengerName
                      ? item.passengerName
                      : item?.__cusEmp__?.name}
                  </NTText>
                </View>
              ))}
            </View>
          </ContaintHis>
        );
      } else if (keyTime.indexOf("dropOff") > -1) {
        let listCus = dataHisPass.filter(
          (val) =>
            val?.__histories__.length > 0 &&
            val?.__histories__.some(
              (his) => his.id == dataHis?.[item]?.[keyTime][0].id
            )
        );
        return (
          <ContaintHis list={dataHis?.[item]?.[keyTime]} title={"Trả Khách"}>
            <View>
              <View style={{ marginBottom: normalize(5) }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    flex: 1,
                    fontSize: 15,
                    color: COLORS.black,
                  }}
                >
                  {dataHis?.[item]?.[keyTime][0]?.description
                    ? dataHis?.[item]?.[keyTime][0]?.description.split(
                        "<br/>"
                      )[0]
                    : ""}
                </Text>
                <Text
                  style={{ fontSize: 12, color: COLORS.black, paddingTop: 5 }}
                >
                  {Utils.pipeDate(
                    dataHis?.[item]?.[keyTime][0]?.createdAt,
                    "HH:mm:ss DD/MM/YYYY"
                  )}
                </Text>
              </View>
              {listCus.map((item, index) => (
                <View key={index} style={styles.lableCus}>
                  <NTText h6>
                    {!!item?.passengerName
                      ? item.passengerName
                      : item?.__cusEmp__?.name}
                  </NTText>
                </View>
              ))}
            </View>
          </ContaintHis>
        );
      } else if (keyTime.indexOf("In_PARKING") > -1) {
        return (
          <ContaintHis
            list={dataHis?.[item]?.[keyTime].slice(0, 1)}
            title={"Về bãi"}
          />
        );
      } else {
        return (
          <ContaintHis
            list={dataHis?.[item]?.[keyTime].slice(0, 1)}
            title={"Ra bãi"}
          />
        );
      }
    };
    return (
      //list supItem by Date
      <View>
        <View
          style={{
            width: normalize(100),
            height: normalize(30),
            backgroundColor: COLORS.blu45a6ff,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: normalize(5),
          }}
        >
          <NTText h6 txtStyle={{ color: COLORS.white }}>
            {item}
          </NTText>
        </View>
        {Object.keys(dataHis?.[item]).map((item2, index2) => (
          <FShadowView key={item2}>{containt(item2)}</FShadowView>
        ))}
      </View>
    );
  };

  const ContaintHis = (props: {
    list: Array<any>;
    title: string;
    children?: JSX.Element;
  }) => {
    const { list, title, children = null } = props;
    return (
      <Row
        between
        containtStyle={{
          alignItems: "flex-start",
          paddingVertical: normalize(5),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: COLORS.black,
            width: normalize(90),
          }}
        >
          {title}
        </Text>
        <View style={{ flex: 1 }}>
          {!children
            ? list.map((item, index) => (
                <View
                  key={index}
                  style={{ flex: 1, marginBottom: normalize(5) }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      flex: 1,
                      fontSize: 15,
                      color: COLORS.black,
                    }}
                  >
                    {list[0]?.description
                      ? list[0]?.description
                          .replace("<br>", "\n")
                          .split("Bao gồm")[0]
                      : ""}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: COLORS.black, paddingTop: 5 }}
                  >
                    {Utils.pipeDate(list[0]?.createdAt, "HH:mm:ss DD/MM/YYYY")}
                  </Text>
                </View>
              ))
            : children}
        </View>
      </Row>
    );
  };
  return (
    <View
      style={{ paddingHorizontal: 10, width: deviceWidth, paddingBottom: 5 }}
    >
      {_renderContaint()}
      {modalTime()}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  containerTitle: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  containerText: {
    fontWeight: "500",
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  selectTimeBtn: {
    width: "100%",
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.black,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  flexStart: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    width: deviceWidth,
    backgroundColor: COLORS.white,
    paddingBottom: getBottomSpace() + 10,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomView: {
    // height: normalize(80),
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
    backgroundColor: COLORS.white,
    width: deviceWidth,
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: getBottomSpace() + 10,
  },
  bottomButton: {
    width: 100,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  bgStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    opacity: 0.3,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  lableCus: {
    flex: 1,
    marginBottom: normalize(5),
    backgroundColor: COLORS.grayBDBDBD,
    borderRadius: normalize(5),
    height: normalize(25),
    justifyContent: "center",
    paddingLeft: normalize(10),
  },
});
