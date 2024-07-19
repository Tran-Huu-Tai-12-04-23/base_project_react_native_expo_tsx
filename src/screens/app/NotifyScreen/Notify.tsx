import { COLORS } from "@common/index";
import { FHeader, FView } from "@components/index";
import NTText from "@components/texts/FText";
import React, { useCallback } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import ButtonGroup from "react-native-elements/dist/buttons/ButtonGroup";
import stylesApp from "../styleApp";
import NotifyItem from "./components/NotiItem";

type IProps = {};
const NotifyScreen = ({}: IProps) => {
  const _renderItem = useCallback((item: any) => {
    return <NotifyItem />;
  }, []);

  return (
    <FView>
      <FHeader type="back" title="Thông báo" align="center" />
      <ButtonGroup
        onPress={() => {}}
        selectedIndex={0}
        buttons={["Đóng ý", "Không đóng ý", "Đã xem"]}
        selectedButtonStyle={{ backgroundColor: COLORS.primary }}
        containerStyle={{ height: 50, borderColor: COLORS.primary }}
        textStyle={{ textAlign: "center", fontWeight: "600" }}
      />
      <View style={{ flex: 1, padding: 10 }}>
        {true ? (
          <FlatList
            numColumns={1}
            showsVerticalScrollIndicator={false}
            data={[1, 2, 4, 5]}
            refreshControl={
              <RefreshControl
                tintColor={COLORS.primary}
                colors={[COLORS.primary]}
                refreshing={false}
                onRefresh={() => {}}
              />
            }
            renderItem={_renderItem}
            keyExtractor={(index) => index.toString()}
            initialNumToRender={10}
            onEndReachedThreshold={0.5}
            onEndReached={() => {}}
          />
        ) : (
          <View style={stylesApp.frameSchedule}>
            <NTText h1 h1Style={stylesApp.txtSmallBold}>
              Bạn chưa có thông báo nào
            </NTText>
          </View>
        )}
      </View>
    </FView>
  );
};

export default NotifyScreen;
