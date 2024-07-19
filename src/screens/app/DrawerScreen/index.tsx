import { COLORS, normalize } from "@common/index";
import { Options } from "@common/options";
import { useAuth } from "@context/authContext";
import { IconMaterialCommunity } from "@helpers/deflibs";
import { navigate } from "@navigation/NavigationService";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
const drawerContentOptions = {
  activeBackgroundColor: "transparent",
  activeTintColor: "white",
  inactiveTintColor: "white",
};

function DrawerScreen() {
  const { loginData, logout } = useAuth();
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#19547b", "#2193b0", "#6dd5ed"]}
    >
      <View style={{ height: 20 }}></View>
      <DrawerContentScrollView
        {...drawerContentOptions}
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.containerTitle}>
          <View style={{ flexDirection: "row" }}>
            {loginData?.image ? (
              <Image
                source={{ uri: loginData.image }}
                style={{ width: 50, height: 50, borderRadius: 99999 }}
                resizeMode="cover"
              />
            ) : (
              <IconMaterialCommunity
                name="account-circle-outline"
                size={50}
                color="white"
              />
            )}
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.containerText}>Nguyen tan hiep</Text>
              <View style={{ marginVertical: normalize(5) }} />
              <Text style={styles.containerText}>Mã TX: 926</Text>
            </View>
          </View>
        </View>
        <View>
          {Options.MENU_LEFT.map((menu: any, idx: number) => (
            <DrawerItem
              key={idx}
              labelStyle={styles.drawerLabel}
              label={menu.text}
              onPress={() => {
                menu?.tabChange && navigate(menu?.tabChange);
              }}
              icon={() => (
                <IconMaterialCommunity
                  name={menu.icon}
                  color={colors.white}
                  size={30}
                />
              )}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      <View style={{ margin: 20, marginBottom: 50 }}>
        <Button
          buttonStyle={{
            backgroundColor: COLORS.primary,
          }}
          title={"Đăng xuất"}
          onPress={logout}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  drawerItem: { alignItems: "flex-start", marginVertical: 0 },
  drawerLabel: { color: "white", marginLeft: -15 },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    flex: 1,
  },
  containerTitle: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: normalize(80),
    alignItems: "center",
    paddingHorizontal: 10,
  },
  containerText: {
    color: "white",
    fontWeight: "700",
  },
});
export default DrawerScreen;
