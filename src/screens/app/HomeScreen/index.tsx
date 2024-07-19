import { ESize } from "@common/enums";
import { COLORS } from "@common/index";
import { Options } from "@common/options";
import { FHeader, FView, Row } from "@components/index";
import NTText from "@components/texts/FText";
import { useAuth } from "@context/authContext";
import CoreHelper from "@helpers/coreHelper";
import { Button, IconMaterialCommunity } from "@helpers/deflibs";
import { navigate } from "@navigation/NavigationService";
import { IScreenProps } from "@screens/shared/interface";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface IProps extends IScreenProps {}

const HomeScreen = ({}: IProps) => {
  const { loginData } = useAuth();
  return (
    <FView>
      <FHeader type="menu" title="GREEN LEAF VIET NAM" align="center" />
      <View style={styles.containerTitle}>
        <Row full between style={{ alignItems: "center" }}>
          <Row start colGap={10}>
            {loginData?.image ? (
              <Image
                source={{ uri: loginData.image }}
                style={{ width: 60, height: 60, borderRadius: 100 }}
                resizeMode="cover"
              />
            ) : (
              <IconMaterialCommunity
                name="account-circle-outline"
                size={50}
                color="white"
              />
            )}

            <Row direction="column" start rowGap={10}>
              <NTText
                w700
                h1
                h1Style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
              >
                Nguyen Tan Hiep
              </NTText>
              <NTText h1 h1Style={{ color: "white" }}>
                Mã TX: 926
              </NTText>
            </Row>
          </Row>
          <NTText
            h1
            h1Style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
          >
            {CoreHelper.formatDateTime(new Date())}
          </NTText>
        </Row>
        <Row start full>
          <Text style={[styles.containerText, { fontSize: 16 }]}>
            {/* {Utils.pipeDate(schedule?.schedule?.processDate || new Date())} */}
          </Text>
        </Row>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Options.MENU_CENTER.map((menu, idx) => (
          <Button
            key={idx}
            icon={{
              type: "material-community",
              name: menu.icon,
              color: COLORS.primary,
              size: 37,
            }}
            iconContainerStyle={{
              position: "absolute",
              left: 10,
              marginRight: 20,
            }}
            type="outline"
            title={`${menu.text} ${idx === 0 ? "(" + 0 + ")" : ""}`}
            titleStyle={{
              color: COLORS.primary,
              textTransform: "uppercase",
              fontWeight: "600",
            }}
            buttonStyle={[
              {
                height: ESize.heightScreen / 9,
                borderColor: COLORS.primary,
                borderWidth: 1,
              },
            ]}
            containerStyle={{
              paddingHorizontal: 50,
              paddingVertical: 10,
              backgroundColor: "white",
            }}
            onPress={() => navigate(menu.tabChange)}
          />
        ))}
      </ScrollView>
    </FView>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    flex: 1,
  },
  containerTitle: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 80,
    backgroundColor: COLORS.primary,
    padding: 10,
  },
  containerText: {
    color: "white",
    fontWeight: "500",
  },
});

export default HomeScreen;
