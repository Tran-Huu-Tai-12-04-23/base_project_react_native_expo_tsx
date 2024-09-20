import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { MaterialIcons } from "@expo/vector-icons";
import { normalize } from "@helper/helpers";
import React from "react";
import { StyleSheet, Switch, TouchableOpacity } from "react-native";
import { styleGlobal } from "src/styles";

interface Props {
  title: string;
  subTitle?: string;
  isChecked?: boolean;
  isNavigate?: boolean;
  isBorderBottom?: boolean;
  onPress?: () => void;
}
function RowItem({
  title,
  subTitle,
  isChecked = false,
  isNavigate = true,
  isBorderBottom = false,
  onPress,
}: Props) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={onPress}>
      <Row
        full
        rowGap={5}
        between
        style={[
          styles.item,
          {
            borderBottomColor: isBorderBottom ? theme.border : "transparent",
          },
        ]}
      >
        <Row direction="column" start rowGap={2}>
          <TextDefault bold style={{ fontSize: normalize(12) }}>
            {title}
          </TextDefault>
          {subTitle && (
            <TextDefault
              style={{
                width: "90%",
                fontSize: normalize(10),
                color: theme.textSecond,
              }}
            >
              {subTitle}
            </TextDefault>
          )}
        </Row>
        {isChecked && (
          <Switch
            value={true}
            trackColor={{ false: theme.border, true: theme.primary }}
          />
        )}
        {isNavigate && (
          <MaterialIcons
            name="arrow-forward-ios"
            size={normalize(18)}
            color={theme.icon}
          />
        )}
      </Row>
    </TouchableOpacity>
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

export default RowItem;
