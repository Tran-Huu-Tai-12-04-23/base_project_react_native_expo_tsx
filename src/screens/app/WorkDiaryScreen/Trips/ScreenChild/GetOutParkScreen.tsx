import { FHeader, FPickImage, FView, Row } from "@components/index";
import FAutoComplete from "@components/inputs/FAutocomplete";
import InputDefault from "@components/inputs/FInput/AInput";
import NTText from "@components/texts/FText";
import FDatetimePicker from "@components/views/FDateTimePicker";
import FDismissKeyboard from "@components/views/FDismissKeyboard";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
const styles = StyleSheet.create({
  containerTitle: {
    padding: 10,
  },
  inputLable: {
    height: 35,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    flex: 1,
  },
});
const messOdo = "Số ODO không được trống.";
const messImgOdo = "Ảnh ODO không được trống.";

type Props = {};
const GoToParkScreen = (props: Props) => {
  return (
    <FView>
      <FHeader type="back" title="Về bãi" align="center" />
      <FDismissKeyboard>
        <Row full direction="column" start rowGap={10} style={{ padding: 10 }}>
          <Row between full>
            <NTText h1 h1Style={{ width: 140, fontSize: 16 }}>
              Bãi xe:
            </NTText>
            <FAutoComplete
              labelFiled="name"
              title={""}
              value={"1"}
              disable={false}
              onChooseValue={() => {}}
              items={[
                { name: "Bãi xe không xác định" },
                { name: "Bãi xe apetechs" },
                { name: "Văn phòng GLV" },
                { name: "Bãi xe không xác định" },
                { name: "Bãi xe apetechs" },
                { name: "Văn phòng GLV" },
                { name: "Bãi xe không xác định" },
                { name: "Bãi xe apetechs" },
                { name: "Văn phòng GLV" },
                { name: "Bãi xe không xác định" },
                { name: "Bãi xe apetechs" },
                { name: "Văn phòng GLV" },
                { name: "Bãi xe apetechs" },
                { name: "Văn phòng GLV" },
                { name: "Bãi xe không xác định" },
                { name: "Bãi xe apetechs" },
                { name: "Văn phòng GLV" },
                { name: "Bãi xe không xác định" },
                { name: "Bãi xe apetechs" },
                { name: "Văn phòng GLV" },
              ]}
            />
          </Row>
          <Row between full>
            <NTText h1 h1Style={{ width: 140, fontSize: 16 }}>
              Địa chỉ bãi xe:
            </NTText>
            <InputDefault disable />
          </Row>

          <Row between full>
            <NTText h1 h1Style={{ width: 140, fontSize: 16 }}>
              Số xe:
            </NTText>
            <FAutoComplete
              labelFiled="name"
              title={""}
              value={"1"}
              disable={false}
              onChooseValue={() => {}}
              items={[
                { name: "77D170324" },
                { name: "7777555" },
                { name: "77D170324" },
                { name: "7777555" },
                { name: "77D170324" },
                { name: "7777555" },
                { name: "77D170324" },
                { name: "7777555" },
                { name: "7777555" },
                { name: "77D170324" },
                { name: "7777555" },
                { name: "77D170324" },
                { name: "7777555" },
              ]}
            />
          </Row>
          <Row between full>
            <NTText h1 h1Style={{ width: 140, fontSize: 16 }}>
              T/G thực tế:
            </NTText>
            <FDatetimePicker mode={"time"} />
          </Row>
          <Row between full>
            <NTText h1 h1Style={{ width: 140, fontSize: 16 }}>
              Số ODO:
            </NTText>
            <InputDefault placeholder="Nhập số ODO" />
          </Row>
          <Row between direction="column" rowGap={10} center full>
            <Row start full>
              <NTText h1 h1Style={{ width: 140, fontSize: 16 }}>
                Hình ảnh:
              </NTText>
            </Row>
            <Row full center>
              <FPickImage />
            </Row>
            <Button
              title="Chụp ảnh"
              onPress={() => {}}
              buttonStyle={{
                width: 200,
                borderRadius: 100,
              }}
              type="solid"
            />
          </Row>
        </Row>
      </FDismissKeyboard>
    </FView>
  );
};

export default GoToParkScreen;
