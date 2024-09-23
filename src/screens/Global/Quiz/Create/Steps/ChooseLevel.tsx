import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { deviceWidth } from "@helper/utils";
import { localImages } from "assets/localImage";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { styleGlobal } from "src/styles";

export enum ELevel {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

function ChooseLevel() {
  const { theme } = useTheme();
  const [selectedLevel, setSelectedLevel] = React.useState<ELevel | null>(null);
  const levelData = [
    {
      name: ELevel.Easy,
      key: ELevel.Easy,
    },
    {
      name: ELevel.Medium,
      key: ELevel.Medium,
    },
    {
      name: ELevel.Hard,
      key: ELevel.Hard,
    },
  ];
  return (
    <Row full direction="column" start style={styles.container}>
      <Image source={localImages().chooseLevel} style={styles.icon} />

      <Row full direction="column" center rowGap={normalize(10)}>
        {levelData.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedLevel(item.key);
            }}
            key={index}
            style={{ width: "100%" }}
          >
            <Row
              style={[
                styles.levelItem,
                {
                  backgroundColor:
                    selectedLevel === item.key
                      ? theme.primary
                      : theme.background,
                },
              ]}
              center
            >
              <TextDefault
                style={{
                  color:
                    selectedLevel === item.key ? theme.background : theme.text,
                }}
                bold
                size={normalize(16)}
              >
                {item.name}
              </TextDefault>
            </Row>
          </TouchableOpacity>
        ))}
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: normalize(20),
  },
  icon: {
    width: normalize(deviceWidth / 2),
    height: normalize(deviceWidth / 2),
  },
  levelItem: {
    width: "100%",
    borderRadius: normalize(10),
    padding: normalize(20),
    ...styleGlobal.shadow,
  },
});

export default ChooseLevel;
