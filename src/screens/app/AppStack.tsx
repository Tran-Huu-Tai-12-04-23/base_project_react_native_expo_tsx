import { IconMaterialCommunity } from "@helpers/deflibs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import appRouters from "./app.routers";
import DrawerScreen from "./DrawerScreen";
import HomeScreen from "./HomeScreen";
import NotifyScreen from "./NotifyScreen";
import ReportOffScreen from "./ReportOffScreen";
import SendRequestScreen from "./SendRequestScreen";
import WorkDiaryScreen from "./WorkDiaryScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const { Screen, Navigator } = Drawer;

const AppScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {Object.keys(appRouters).map((screenName: any) => {
        const screenChild = appRouters[screenName];
        if (screenName == "HomeScreen") {
          return (
            <Stack.Screen
              key={screenName}
              name={screenName}
              component={TabBarScreen}
            />
          );
        }
        return (
          <Stack.Screen
            key={screenName}
            name={screenName}
            component={screenChild}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const TabBarScreen = (props: any) => {
  const selectedIconName = (routerName: string) => {
    switch (routerName) {
      case "HomeStack":
        return "home";
      case "NotifyStack":
        return "bell-outline";
      case "WorkDiaryStack":
        return "format-list-text";
      case "ReportOffStack":
        return "account-off";
      case "SendRequestStack":
        return "frequently-asked-questions";
      default:
        return "home";
    }
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = selectedIconName(route.name);
          return (
            <View>
              {route.name == "NotifyStack" ? (
                <View style={styles.wrapNoti}>
                  <Text style={styles.notifyNew}>{12}</Text>
                </View>
              ) : null}
              <IconMaterialCommunity
                name={iconName}
                size={size}
                color={color}
              />
            </View>
          );
        },
        tabBarBadgeStyle: {
          color: "red",
        },
      })}
    >
      <Tab.Screen
        options={{ tabBarLabel: "Trang chủ" }}
        name="HomeStack"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Thông báo" }}
        name="NotifyStack"
        component={NotifyScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Xe tháng" }}
        name="WorkDiaryStack"
        component={WorkDiaryScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Báo nghỉ" }}
        name="ReportOffStack"
        component={ReportOffScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Gửi yêu cầu" }}
        name="SendRequestStack"
        component={SendRequestScreen}
      />
    </Tab.Navigator>
  );
};

export const drawerRouters = {
  AppScreens: AppScreens,
  TabBarScreen: TabBarScreen,
};
export type TDrawerScreenName = keyof typeof drawerRouters;
export const AppStack: React.FC = (props: any) => {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AppScreens"
      drawerContent={(props) => {
        return <DrawerScreen {...(props as any)} />;
      }}
    >
      <Screen name="AppScreens" component={AppScreens} />
    </Navigator>
  );
};
const styles = StyleSheet.create({
  drawerStyles: { flex: 1, width: "75%" },
  drawerItem: { alignItems: "flex-start", marginVertical: 0 },
  drawerLabel: { color: "white", marginLeft: -16 },
  notifyNew: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  wrapNoti: {
    backgroundColor: "#de4547",
    borderRadius: 10,
    position: "absolute",
    zIndex: 1,
    paddingHorizontal: 5,
    left: -7,
    top: -2,
  },
});
