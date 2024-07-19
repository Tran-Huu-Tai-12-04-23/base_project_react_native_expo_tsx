import { Row } from "@components/index";
import React from "react";
import Button from "react-native-elements/dist/buttons/Button";
type Props = {
  actions: [() => void, () => void, () => void];
  titles: [string, string, string];
  backgroundColors: [string, string, string];
};
function GroupNotifyAction({ titles, actions, backgroundColors }: Props) {
  return (
    <Row
      full
      start
      direction="column"
      rowGap={5}
      style={{ alignContent: "center", alignItems: "center", marginBottom: 10 }}
    >
      <Button
        type="solid"
        title={titles[0]}
        titleStyle={{ color: "white", fontWeight: "500" }}
        buttonStyle={{ backgroundColor: backgroundColors[0] }}
        containerStyle={{ marginHorizontal: 10, width: 300, marginTop: 10 }}
        onPress={actions[0]}
        loading={false}
      />
      <Button
        type="solid"
        title={titles[1]}
        titleStyle={{ color: "white", fontWeight: "500" }}
        buttonStyle={{ backgroundColor: backgroundColors[1] }}
        containerStyle={{ marginHorizontal: 10, width: 300, marginTop: 10 }}
        onPress={actions[1]}
        loading={false}
      />
      <Button
        type="solid"
        title={titles[2]}
        titleStyle={{ color: "white", fontWeight: "500" }}
        buttonStyle={{ backgroundColor: backgroundColors[2] }}
        containerStyle={{ marginHorizontal: 10, width: 300, marginTop: 10 }}
        onPress={actions[2]}
        loading={false}
      />
    </Row>
  );
}

export default GroupNotifyAction;
