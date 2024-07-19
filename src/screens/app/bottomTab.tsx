import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { COLORS, deviceWidth, getBottomSpace } from "@common/index";
import Row from "@components/views/FView/Row";
import { IconMaterialCommunity } from "@helpers/deflibs";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

const TabBarManage = ({ state, descriptors, navigation, type }: any) => {
  const [isModal, setModal] = useState(false);
  const opacityAnimate = useSharedValue(0);
  const closeModal = () => setModal(false);

  useEffect(() => {
    opacityAnimate.value = isModal ? withSpring(1) : 0;
  }, [isModal]);

  const renderItem = (
    route: { key: string | number; name: any },
    index: React.Key | null | undefined
  ) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };
    const selectedIconName = (routerName: number) => {
      switch (routerName) {
        case 0:
          return "home";
        case 1:
          return "bell-outline";
        case 2:
          return "format-list-text";
        case 3:
          return "account-off";
        case 4:
          return "frequently-asked-questions";
        default:
          return "home";
      }
    };
    return (
      <AnimatedTouch
        key={index}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <IconMaterialCommunity
          name={selectedIconName(index as any)}
          size={30}
          color={COLORS.white}
        />
      </AnimatedTouch>
    );
  };

  return (
    <View style={styles.content}>
      <Row around containtStyle={styles.wrapper}>
        {state.routes.map(
          (
            route: { key: string | number; name: any },
            index: React.Key | null | undefined
          ) => renderItem(route, index)
        )}
      </Row>
    </View>
  );
};
export default TabBarManage;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-around",
  },
  bgStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    opacity: 0.5,
    zIndex: 1,
  },
  content: {
    flexDirection: "row",
    width: deviceWidth,
    height: 50 + getBottomSpace(),
    paddingBottom: getBottomSpace(),
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowOffset: { height: -3.5, width: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  txt: {
    color: "white",
    marginLeft: 5,
  },
});
