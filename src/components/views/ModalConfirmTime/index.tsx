import { COLORS, deviceWidth, getStatusBarHeight } from "@common/index";
import FInput from "@components/inputs/FInput";
import ModalTime from "@components/views/ModalTime";
import { Utils } from "@helpers/utils";
import stylesApp from "@screens/app/styleApp";
import React, { Component } from "react";
import {
  ImageBackground,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import FPickImage from "../FPickImage";
import { ModalTakePicture } from "@components/index";

interface props {
  title: string;
  titleTime: string;
  titleDate: string;
  visible: boolean;
  loading: boolean;
  timeProps: Date;
  dateProps: Date;
  showConfirm: () => void;
  saveConfirm: (
    pickupTime: Date,
    pickupDate: Date,
    odo: string,
    imageUrl?: string
  ) => void;
  isOdo: boolean;
  isUpdateImg?: boolean;
  address?: string;
}

export default class ModalConfirmTime extends Component<props> {
  state = {
    showTime: false,
    showDate: false,
    time: this.props.timeProps,
    date: this.props.dateProps,
    odo: null,
    validOdo: false,
    imageUrl: "",
    keyCamera: null,
    visibleCam: false,
  };

  toogleShowTime = (show: boolean) => {
    this.setState({ showTime: show });
  };

  toogleShowDate = (show: boolean) => {
    this.setState({ showDate: show });
  };

  onChangeTime = (val: Date) => {
    this.setState({ time: val });
  };

  onChangeDate = (val: Date) => {
    this.setState({ date: val });
  };

  openCamera = (key: string) => {
    this.setState({ keyCamera: key });
    this.toogleVisbleCamera(true);
  };

  toogleVisbleCamera = (visiable: boolean) => {
    this.setState({ visibleCam: visiable });
  };

  handleSetPicture = (uri: string) => {
    const { keyCamera } = this.state;
    this.setState({ [keyCamera]: uri });
    this.toogleVisbleCamera(false);
  };

  openGps(fullAddress: string) {
    var url =
      Platform.OS === "ios"
        ? `maps:0,0?q=${fullAddress}`
        : `geo:0,0?q=${fullAddress}`;
    this.openExternalApp(url);
  }

  openExternalApp(url: string) {
    Linking.canOpenURL(url).then((supported) => {
      Linking.openURL(url);
      if (supported) {
      } else {
      }
    });
  }

  render() {
    const {
      title,
      titleTime,
      titleDate,
      visible,
      saveConfirm,
      showConfirm,
      loading,
      isOdo,
      isUpdateImg = false,
      address,
    } = this.props;
    const {
      showTime,
      showDate,
      time,
      date,
      odo,
      validOdo,
      imageUrl,
      visibleCam,
    } = this.state;

    return (
      <Modal visible={visible} transparent={true}>
        <View style={{ flex: 1, flexGrow: 1 }}>
          <TouchableOpacity
            onPress={() => showConfirm()}
            style={{ flex: 1, flexGrow: 1 }}
          >
            <ImageBackground source={{}} style={[styles.bgStyle]} />
          </TouchableOpacity>
          <View style={styles.containtModal}>
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 35,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.black,
                }}
              >
                {title}
              </Text>
              <View style={{ marginHorizontal: 40 }}>
                <View style={stylesApp.rowBetWeen}>
                  <Text style={{ color: COLORS.black }}>{titleTime} :</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.toogleShowDate(false);
                      this.toogleShowTime(true);
                    }}
                  >
                    <Text
                      style={{
                        borderWidth: 1,
                        padding: 5,
                        borderColor: "#ccc",
                        color: COLORS.black,
                      }}
                    >
                      {Utils.pipeDate(time, "HH:mm")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={stylesApp.mgTop20} />

                <View style={stylesApp.rowBetWeen}>
                  <Text style={{ color: COLORS.black }}>{titleDate} :</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.toogleShowTime(false);
                      this.toogleShowDate(true);
                    }}
                    disabled={true}
                  >
                    <Text style={{ color: COLORS.black }}>
                      {Utils.pipeDate(date, "DD/MM/YYYY")}
                    </Text>
                  </TouchableOpacity>
                </View>

                {isOdo && (
                  <View style={[stylesApp.rowBetWeen, { marginTop: 20 }]}>
                    <Text style={{ color: COLORS.black }}>ODO :</Text>
                    <View style={{ right: -10 }}>
                      <FInput
                        type="square"
                        placeholder={"Nhập ODO"}
                        value={Utils.pipeTextUi(
                          odo ? Utils.pipeCurrency(parseInt(odo), "") : ""
                        )}
                        onChangeText={(value) => {
                          this.setState({
                            odo: value
                              ? Utils.replaceNumberal(value).toString()
                              : "",
                          });
                        }}
                        keyboardType="numeric"
                        inputStyle={stylesApp.txtSmall}
                        inputContainerStyle={{ height: 35, width: 150 }}
                        errorMessage={"ODO không được trống"}
                        errorStyle={{
                          display: Utils.checkAndRenderMessErr(validOdo),
                          fontWeight: "500",
                        }}
                      />
                    </View>
                  </View>
                )}
                {isUpdateImg && (
                  <View style={{ alignSelf: "center", marginVertical: 20 }}>
                    <FPickImage
                      width={200}
                      height={200}
                      value={imageUrl}
                      openCamera={() => this.openCamera("imageUrl")}
                    />
                  </View>
                )}
              </View>

              <View style={stylesApp.mgBottom20} />

              <View style={styles.buttonContainer}>
                <Button
                  icon={{
                    type: "material",
                    name: "check",
                    size: 15,
                    color: "white",
                  }}
                  type="solid"
                  containerStyle={{ width: "49%", marginRight: 5 }}
                  onPress={() => {
                    if (isOdo) {
                      if (
                        odo &&
                        ((isUpdateImg && !!imageUrl) || !isUpdateImg)
                      ) {
                        saveConfirm(time, date, odo, imageUrl);
                        this.setState({ odo: null });
                      } else {
                        this.setState({ validOdo: true });
                      }
                    } else {
                      saveConfirm(time, date, odo);
                    }
                  }}
                  loading={loading}
                />
                <Button
                  icon={{
                    type: "material",
                    name: "cancel",
                    size: 15,
                    color: "white",
                  }}
                  type="clear"
                  containerStyle={{
                    backgroundColor: "#ff6666",
                    width: "49%",
                    marginRight: 5,
                  }}
                  onPress={() => showConfirm()}
                  loading={loading}
                />
              </View>

              {address && (
                <TouchableOpacity
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: "green",
                      borderRadius: 2,
                      marginTop: 20,
                      padding: 6,
                    },
                  ]}
                  onPress={() => {
                    this.openGps(address);
                    showConfirm();
                  }}
                >
                  <Text>Xem đường đi</Text>
                </TouchableOpacity>
              )}

              <ModalTime
                testID="time"
                key="time"
                mode="time"
                show={showTime}
                time={time}
                cancel={() => this.toogleShowTime(false)}
                onChangeTime={this.onChangeTime}
                minimumDate={new Date()}
              />
              <ModalTime
                testID="date"
                key="date"
                mode="date"
                show={showDate}
                time={date}
                cancel={() => this.toogleShowDate(false)}
                onChangeTime={this.onChangeDate}
                minimumDate={new Date()}
              />
            </View>
            <ModalTakePicture
              visible={visibleCam}
              cancel={() => this.toogleVisbleCamera(false)}
              picture={this.handleSetPicture}
              imageLibrary={true}
              imageCamera={true}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containtModal: {
    position: "absolute",
    top: getStatusBarHeight() + 150,
    left: 10,
    width: deviceWidth - 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 10,
  },
  bgStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    opacity: 0.6,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginTop: 10,
  },
  containerTitle: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  containerText: {
    fontWeight: "500",
  },
  textView: { fontSize: 13 },
});
