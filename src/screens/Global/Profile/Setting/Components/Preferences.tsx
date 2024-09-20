import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";
import { StyleSheet } from "react-native";
import { styleGlobal } from "src/styles";
import RowItem from "./RowItem";

const preferencesData = [
  { name: "Push notification", checked: false },
  { name: "Sound effects", checked: false },
];

function Preferences({ onSettingTheme }: { onSettingTheme: () => void }) {
  const { theme } = useTheme();

  return (
    <Row direction="column" full start rowGap={normalize(5)}>
      <TextDefault>Preferences</TextDefault>
      <Row
        full
        direction="column"
        start
        style={[
          styles.wrapper,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        {preferencesData.map((item, index) => (
          <RowItem
            isBorderBottom
            key={index}
            title={item.name}
            isNavigate={false}
            isChecked
          />
        ))}
        <RowItem title={"Themes"} subTitle="Dark" onPress={onSettingTheme} />
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

export default Preferences;
