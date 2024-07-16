import { deviceHeight, deviceWidth } from "@helper/utils";
import React from "react";
import { Animated, Image, StyleSheet } from "react-native";

const TeamCard = ({ image, isFirst, swipe, titlSign, index, ...rest }: any) => {
  // Calculate the rotation of the card based on swipe gesture
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  // Animated style for the card with rotation and translation
  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { top: 60 - index * 10 },
        isFirst && animatedCardStyle,
      ]}
      {...rest}
    >
      <Image source={{ uri: image }} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: (deviceWidth * 0.1) / 2,
  },
  image: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.2,
    borderRadius: 20,
  },
});

export default TeamCard;
