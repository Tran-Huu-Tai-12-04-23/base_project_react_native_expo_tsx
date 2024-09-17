import { ButtonSecond } from "@components/Button";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import FemaleIcon from "assets/svg/female-icon";
import FindFriendIcon from "assets/svg/find-friend-icon";
import MaleIcon from "assets/svg/male-icon";
import React from "react";
import { StyleSheet, View } from "react-native";

function FindFriendCard() {
  const { theme } = useTheme();
  return (
    <Row
      direction="column"
      rowGap={10}
      style={{
        borderRadius: normalize(8),
        padding: normalize(10),
        backgroundColor: "rgba(0,0,0,0.05)",
        minHeight: normalize(200),
      }}
    >
      <View style={styles.leftIcon}>
        <FemaleIcon />
      </View>
      <View style={styles.rightIcon}>
        <MaleIcon />
      </View>

      <TextDefault bold>FEATURED</TextDefault>
      <Separator height={10} />
      <TextDefault
        center
        bold
        style={{ width: "70%", fontSize: normalize(18) }}
      >
        Take part in challenges with friends or other players
      </TextDefault>
      <Separator height={10} />

      <ButtonSecond
        iconLeft={<FindFriendIcon color={theme.primary} />}
        textColor={theme.primary}
        title="Find Friends"
        onPress={function (): void {}}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  rightIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});

export default FindFriendCard;
