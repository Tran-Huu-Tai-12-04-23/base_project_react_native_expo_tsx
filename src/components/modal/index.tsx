import { COLORS, normalize } from "@common";
import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface Props {}
interface State {
  visible: boolean;
  title: string;
  content?: string;
  textRed?: string;
  textYes?: string;
  textNo?: string;
  yesFunc?: () => void | null;
  noFunc?: () => void | null;
  componentHeader?: ReactElement;
  componentBody?: ReactElement;
}
export default class ModalAlert extends React.PureComponent<Props, State> {
  static instance: any;

  constructor(props: Props) {
    super(props);
    ModalAlert.instance = this;
    this.state = {
      visible: false,
      title: "",
      content: "",
      textRed: "",
      textYes: "",
      textNo: "Huỷ",
      yesFunc: () => {},
      noFunc: () => {},
    };
  }

  static show(
    title: string = "",
    content: string = "",
    yesFunc: () => void = () => {},
    textYes: string | null = "",
    textNo: string = "Huỷ",
    noFunc: () => void = () => {},
    textRed: string = "",
    autoHide: boolean = false
  ) {
    if (ModalAlert.instance) {
      !ModalAlert.instance.state.visible &&
        ModalAlert.instance.setState({
          visible: true,
          title,
          yesFunc,
          content,
          textYes,
          textNo,
          noFunc,
          textRed,
        });
      if (autoHide) {
        setTimeout(() => {
          ModalAlert.instance.setState({
            visible: false,
          });
        }, 3000);
      }
    }
  }

  static showWithCustom(
    yesFunc: () => void = () => {},
    textYes: string = "",
    textNo: string = "Huỷ",
    noFunc: () => void = () => {},
    autoHide: boolean = false,
    componentHeader?: ReactElement,
    componentBody?: ReactElement
  ) {
    if (ModalAlert.instance) {
      !ModalAlert.instance.state.visible &&
        ModalAlert.instance.setState({
          visible: true,
          yesFunc,
          textYes,
          textNo,
          noFunc,
          componentHeader,
          componentBody,
        });
      if (autoHide) {
        setTimeout(() => {
          ModalAlert.instance.setState({
            visible: false,
          });
        }, 3000);
      }
    }
  }

  static hide() {
    if (ModalAlert.instance) {
      ModalAlert.instance.setState({ visible: false });
    }
  }

  hide() {
    if (ModalAlert.instance) {
      ModalAlert.instance.setState({ visible: false });
    }
  }

  render() {
    if (ModalAlert?.instance?.state?.visible) {
      return (
        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          isVisible={this.state.visible || false}
          style={{
            margin: 0,
            padding: 0,
            flex: 1,
            alignItems: "center",
          }}
        >
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              {this.state.componentHeader ? (
                this.state.componentHeader
              ) : (
                <Text style={styles.title}>{this.state.title}</Text>
              )}
              {this.state.componentBody ? (
                this.state.componentBody
              ) : this.state.content ? (
                <Text style={styles.content}>
                  {this.state.content}
                  {this.state.textRed ? (
                    <Text style={styles.red}> {this.state.textRed}</Text>
                  ) : (
                    ""
                  )}
                </Text>
              ) : undefined}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  this.state.textYes &&
                  this.state.textNo?.length != this.state.textYes?.length &&
                  !this.state.componentHeader
                    ? undefined
                    : styles.flex,
                ]}
                onPress={() => {
                  this.hide();
                  if (!this.state?.textYes && this.state?.yesFunc) {
                    this.state.yesFunc();
                  } else {
                    this.state?.noFunc ? this.state?.noFunc() : undefined;
                  }
                }}
              >
                <Text style={styles.buttonTextNo}>{this.state.textNo}</Text>
              </TouchableOpacity>

              {this.state.textYes ? <View style={styles.divider} /> : undefined}

              {this.state.textYes ? (
                <TouchableOpacity
                  style={[styles.button, styles.flex]}
                  onPress={() => {
                    this.hide();
                    this.state.yesFunc ? this.state.yesFunc() : undefined;
                  }}
                >
                  <Text
                    style={
                      this.state.textYes === "Ok" || this.state.componentHeader
                        ? styles.buttonTextNo
                        : styles.buttonTextYes
                    }
                  >
                    {this.state.textYes}
                  </Text>
                </TouchableOpacity>
              ) : undefined}
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    width: normalize(320),
    borderRadius: normalize(20),
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(25),
    borderRadius: normalize(20),
  },
  title: {
    lineHeight: normalize(32),
    marginVertical: normalize(10),
  },
  content: {
    lineHeight: normalize(22),
    marginVertical: normalize(10),
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    // borderTopWidth: normalize(1),
    height: normalize(50),
    width: "100%",
    justifyContent: "space-around",
  },
  buttonTextNo: {
    lineHeight: normalize(22),
    fontSize: 18,
    color: COLORS.white,
  },
  buttonTextYes: {
    lineHeight: normalize(22),
    color: COLORS.bgGray,
  },
  button: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: normalize(42),
  },
  divider: {
    width: normalize(1),
    height: "100%",
    backgroundColor: COLORS.bgGray,
  },
  flex: {
    flex: 1,
  },
  red: {
    color: "red",
  },
});
