import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { MaterialIcons } from "@expo/vector-icons";
import { normalize } from "@helper/helpers";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { styleGlobal } from "src/styles";

const userInfo: { name: string; email: string } = {
  name: "Tran Huu Tai",
  email: "huutt201@gmail.com",
};
function PersonalInfo() {
  const { theme } = useTheme();
  return (
    <Row direction="column" full start rowGap={normalize(5)}>
      <TextDefault>Personal info</TextDefault>
      <Row
        full
        direction="column"
        start
        style={[
          styles.wrapper,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        {Object.keys(userInfo).map((key, index) => (
          <TouchableOpacity key={key} style={{ width: "100%" }}>
            <Row
              full
              rowGap={5}
              between
              style={[
                styles.item,
                {
                  borderBottomColor:
                    index < Object.keys(userInfo)?.length
                      ? theme.border
                      : "transparent",
                },
              ]}
            >
              <Row start direction="column" rowGap={2}>
                <TextDefault bold style={{ fontSize: normalize(16) }}>
                  {key.substring(0, 1).toUpperCase() + key.substring(1)}
                </TextDefault>
                <TextDefault style={{ color: theme.textSecond }}>
                  {userInfo[key as keyof typeof userInfo]}
                </TextDefault>
              </Row>
              <MaterialIcons
                name="arrow-forward-ios"
                size={normalize(18)}
                color={theme.icon}
              />
            </Row>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={{ width: "100%" }}>
          <Row
            full
            rowGap={5}
            between
            style={[
              styles.item,
              {
                borderBottomColor: "transparent",
              },
            ]}
          >
            <TextDefault bold style={{ fontSize: normalize(12) }}>
              Reset password
            </TextDefault>
            <MaterialIcons
              name="arrow-forward-ios"
              size={normalize(18)}
              color={theme.icon}
            />
          </Row>
        </TouchableOpacity>
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...styleGlobal.shadow,
    ...styleGlobal.border,
    borderRadius: normalize(10),
  },
  item: {
    padding: normalize(10),
    borderBottomWidth: 1,
    alignItems: "center",
  },
});

export default PersonalInfo;
