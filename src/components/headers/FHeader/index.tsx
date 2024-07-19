import COLORS from "@common/colors/colors";
import { ESize } from "@common/enums";
import { IconIonicons } from "@helpers/deflibs";
import { Utils } from "@helpers/utils";
import { goBack, navigate, toggleDrawer } from "@navigation/NavigationService";
import { IScreenProps } from "@screens/shared/interface";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps extends IScreenProps {
  type?: "back" | "menu" | "handleBack";
  title?: string;
  align?: "left" | "center" | "right";
  createRequest?: boolean;
  btnAdd?: boolean;
  btnAdd2?: boolean;
  handleAdd?: any;
  handleAdd2?: any;
  onBack?: () => {};
  styleIcon?: string;
  styleIcon2?: string;
  hasProcressDate?: boolean;
}

export default (props: IProps) => {
  const {
    title = "",
    type = "back",
    align = "left",
    createRequest = false,
    btnAdd = false,
    btnAdd2 = false,
    handleAdd,
    handleAdd2,
    onBack,
    styleIcon = "",
    styleIcon2 = "",
    hasProcressDate,
  } = props;
  //@ts-ignore
  const iconLeft =
    type === "menu" ? (
      <IconIonicons name="menu" color={"white"} size={40} />
    ) : (
      <IconIonicons name="chevron-back-outline" color={"white"} size={40} />
    );
  const onPress = () => {
    switch (type) {
      case "menu":
        toggleDrawer();
        break;
      case "handleBack":
        goBack();
        break;
      default:
        goBack();
        break;
    }
  };
  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: COLORS.primary, alignItems: "center" },
      ]}
    >
      <TouchableOpacity style={[styles.item, {}]} onPress={onPress}>
        {iconLeft}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          height: ESize.heightHeader,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            textAlign: align,
            fontWeight: "600",
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      {hasProcressDate ? (
        <Text style={styles.containerText}>{Utils.pipeDate(new Date())}</Text>
      ) : null}
      <TouchableOpacity
        style={[
          styles.item,
          { flexDirection: "row", alignContent: "flex-end" },
        ]}
      >
        {createRequest ? (
          <TouchableOpacity
            onPress={() => {
              navigate("CreateSendRequestScreen");
            }}
          >
            <IconIonicons
              name={!!styleIcon ? styleIcon : "md-add-circle-outline"}
              color={"white"}
              size={40}
            />
          </TouchableOpacity>
        ) : null}
        {btnAdd2 ? (
          <TouchableOpacity onPress={handleAdd2}>
            <IconIonicons
              name={!!styleIcon2 ? styleIcon2 : "md-add-circle-outline"}
              color={"white"}
              size={40}
            />
          </TouchableOpacity>
        ) : null}
        {btnAdd ? (
          <TouchableOpacity onPress={handleAdd}>
            <IconIonicons
              name={!!styleIcon ? styleIcon : "md-add-circle-outline"}
              color={"white"}
              size={40}
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: ESize.heightHeader,
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
  },
  item: {
    width: ESize.heightHeader,
    justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    color: "white",
    fontWeight: "700",
    marginLeft: "auto",
    fontSize: 10,
  },
});
