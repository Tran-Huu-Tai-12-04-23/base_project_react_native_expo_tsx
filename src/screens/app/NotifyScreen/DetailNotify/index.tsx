import { COLORS, normalize } from "@common/index";
import { FHeader, FView, Row } from "@components/index";
import NTText from "@components/texts/FText";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import GroupNotifyAction from "./GroupNotiAction";

interface IProps {}
const styles = StyleSheet.create({
  txtInput: { color: "black", fontSize: 13, fontWeight: "400" },
  lblText: { fontSize: 13, marginTop: 5 },
  viewborder: {
    borderWidth: normalize(0),
    borderColor: COLORS.black,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: normalize(6),
    marginTop: normalize(5),
  },
});
const DetailNotifyScreen = ({}: IProps) => {
  const { params } = useRoute<any>()?.params;

  return (
    <FView>
      <FHeader type="back" title="Chi tiết thông báo" align="center" />
      <Row
        direction="column"
        full
        start
        style={{
          flex: 1,
          padding: 10,
        }}
        rowGap={5}
      >
        <Row start>
          <NTText h6 h6Style={{ fontSize: 14, fontWeight: "thin" }}>
            Tiêu đề:
          </NTText>
          <NTText>Từng quan</NTText>
        </Row>
        <NTText h6 h6Style={{ fontSize: 14, fontWeight: "thin" }}>
          Nội dung:
        </NTText>
        <NTText>
          Chiu hom ay em noi voi anh rangh minh khon be canh nhau ran
        </NTText>
      </Row>
      <GroupNotifyAction
        actions={[
          () => {
            console.log("Đã xem");
          },
          () => {
            console.log("Đồng ý");
          },
          () => {
            console.log("Không đồng ý");
          },
        ]}
        titles={["Đã xem", "Đồng ý", "Không đồng ý"]}
        backgroundColors={[COLORS.primary, COLORS.primary, COLORS.dangerColor]}
      />
    </FView>
  );
};

export default DetailNotifyScreen;
