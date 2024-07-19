import { COLORS } from "@common/index";
import React, { Component } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

interface props {
  title: string;
  visible: boolean;
  isLoading: boolean;
  showConfirm: () => void;
  okConfirm: () => void;
}
export default class ModalConfirm extends Component<props> {
  render() {
    const {
      title,
      visible,
      okConfirm,
      showConfirm,
      isLoading = false,
    } = this.props;
    return (
      <Modal visible={visible} transparent={true}>
        <View
          style={{
            borderColor: "transparent",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginBottom: 15,
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 20,
                color: COLORS.black,
              }}
            >
              {title}
            </Text>

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
                onPress={() => okConfirm()}
                loading={isLoading}
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
                loading={isLoading}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
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
