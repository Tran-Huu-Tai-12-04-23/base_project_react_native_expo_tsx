import { COLORS } from "@common/index";
import { FHeader, FInput, FView } from "@components/index";
import ModalConfirm from "@components/views/ModalConfirm";
import { IScreenProps } from "@screens/shared/interface";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

interface IProps extends IScreenProps {}

const ChangePassScreen = ({}: IProps) => {
  const [visible, setVisible] = useState(false);

  const handleShowConfirm = () => {
    setVisible(!visible);
  };

  const okConfirm = async () => {};

  return (
    <FView>
      <FHeader type="back" title="Đổi mật khẩu" align="center" />
      <View style={{ alignSelf: "center", marginTop: 50 }}>
        <FInput
          type="square"
          placeholder={"Nhập mật khẩu cũ"}
          secureTextEntry={true}
          value={""}
          onChangeText={(value) => {}}
          inputStyle={styles.txtInput}
          inputContainerStyle={{ height: 35, width: 300 }}
          label={"Mật khẩu cũ *"}
          labelStyle={styles.lblText}
          errorMessage={""}
          errorStyle={{
            fontWeight: "500",
          }}
          rightIcon={{
            type: "material-community",
            name: "eye",
            color: COLORS.primary,
            onPress: () => {},
          }}
        />

        {/* Other FInput components here */}

        <Button
          type="solid"
          title="Đổi mật khẩu"
          titleStyle={{ color: "white" }}
          buttonStyle={{ backgroundColor: COLORS.primary }}
          containerStyle={{
            marginHorizontal: 10,
            width: 300,
            marginTop: 10,
          }}
          onPress={() => {}}
        />
      </View>
      <ModalConfirm
        title="Bạn có chắc muốn đổi mật khẩu?"
        showConfirm={() => handleShowConfirm}
        okConfirm={okConfirm}
        visible={visible}
        isLoading={true}
      />
    </FView>
  );
};

const styles = StyleSheet.create({
  txtInput: { color: "black", fontSize: 13, fontWeight: "400" },
  lblText: { fontSize: 13, marginTop: 5 },
});

export default ChangePassScreen;
