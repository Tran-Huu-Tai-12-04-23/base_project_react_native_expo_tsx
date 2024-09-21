import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { navigate } from "@navigation/NavigationService";
import { APP_ROUTE, BOTTOM_TAB_ROUTE } from "@navigation/route";
import AddIcon from "assets/svg/add-icon";
import FolderFavoriteIcon from "assets/svg/folder-favorite-icon";
import HomeIcon from "assets/svg/home-icon";
import PersonalIcon from "assets/svg/personal-icon";
import SearchIcon from "assets/svg/search-icon";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

function CustomBottomBar({ state, descriptors, navigation }: any) {
  const { theme } = useTheme();

  const bottomBarRoutes = [
    {
      name: BOTTOM_TAB_ROUTE.HOME,
      key: BOTTOM_TAB_ROUTE.HOME,
      iconDefault: <HomeIcon color={theme.icon} />,
      iconActive: <HomeIcon color={theme.primary} />,
    },
    {
      name: BOTTOM_TAB_ROUTE.SEARCH,
      key: BOTTOM_TAB_ROUTE.SEARCH,
      iconDefault: <SearchIcon color={theme.icon} />,
      iconActive: <SearchIcon color={theme.primary} />,
    },
    {
      name: BOTTOM_TAB_ROUTE.CREATE_QUIZ,
      key: BOTTOM_TAB_ROUTE.CREATE_QUIZ,
      iconDefault: <AddIcon color={"white"} />,
      iconActive: <AddIcon color={"white"} />,
      isCreate: true,
    },
    {
      name: BOTTOM_TAB_ROUTE.LIBRARY,
      key: BOTTOM_TAB_ROUTE.LIBRARY,
      iconDefault: <FolderFavoriteIcon color={theme.icon} />,
      iconActive: <FolderFavoriteIcon color={theme.primary} />,
    },
    {
      name: BOTTOM_TAB_ROUTE.PERSONAL,
      key: BOTTOM_TAB_ROUTE.PERSONAL,
      iconDefault: <PersonalIcon color={theme.icon} />,
      iconActive: <PersonalIcon color={theme.primary} />,
    },
  ];

  return (
    <BlurView
      intensity={40}
      tint="light"
      style={[
        {
          position: "absolute",
          bottom: 0,
          zIndex: 100,
          backgroundColor: "rgba(255,255,255,0.2)",
          left: 0,
          right: 0,
        },
      ]}
    >
      <View style={[styles.container]}>
        {bottomBarRoutes.map((route, index) => {
          if (route.isCreate) {
            return (
              <View
                key={route.name}
                style={{
                  height: normalize(50),
                  width: normalize(50),
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(1000),
                  paddingHorizontal: normalize(20),
                }}
              >
                <TouchableOpacity
                  onPress={() => navigate(APP_ROUTE.CREATE_QUIZ)}
                  style={[
                    styles.tab,
                    {
                      backgroundColor: theme.primary,
                      borderRadius: normalize(1000),
                      height: normalize(55),
                      width: normalize(55),
                    },
                  ]}
                >
                  {route.iconActive}
                </TouchableOpacity>
              </View>
            );
          }

          const options = descriptors[state.routes[index]?.key]?.options;

          if (!options) return;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: state.routes[index]?.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: state.routes[index]?.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              {isFocused ? route.iconActive : route.iconDefault}
            </TouchableOpacity>
          );
        })}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: normalize(10),
    paddingBottom: normalize(20),
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "18%",
  },
});

export default CustomBottomBar;
