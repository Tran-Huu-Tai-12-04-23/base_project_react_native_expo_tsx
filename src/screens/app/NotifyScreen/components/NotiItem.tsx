import COLORS from "@common/colors/colors";
import NTText from "@components/texts/FText";
import FTouchOpacity from "@components/touchables/FTouchOpacity";
import CoreHelper from "@helpers/coreHelper";
import { navigate } from "@navigation/NavigationService";
import { App_route_key } from "@screens/app/app.routers";
import stylesApp from "@screens/app/styleApp";
import styles from "@screens/auth/SignInScreen/styles";
import React from "react";
import { View } from "react-native";

function NotifyItem() {
  return (
    <FTouchOpacity
      onPress={() =>
        navigate(App_route_key.DetailNotifyScreen, { id: "123123" })
      }
      activeOpacity={0.75}
      style={[
        stylesApp.frameCheckedDiary,
        styles.container,
        {
          borderLeftWidth: true ? 5 : 0,
        },
      ]}
    >
      <NTText
        numberOfLines={2}
        h1
        h1Style={{
          fontWeight: "600",
          fontSize: 16,
          color: COLORS.black,
          flex: 1,
        }}
      >
        Nội dung: Noi dung 1
      </NTText>
      <View style={stylesApp.rowBetWeen}>
        <NTText
          h1
          h1Style={{
            fontWeight: "400",
            fontSize: 13,
            color: COLORS.blu7799bd,
            paddingTop: 5,
          }}
        >
          Thời gian gửi: {CoreHelper.formatDateTime(new Date())}
        </NTText>
        <NTText
          h1
          h1Style={[
            stylesApp.txtMediumBold,
            { color: COLORS.blu7799bd, fontWeight: "500" },
          ]}
        >
          {true ? "Chưa đọc" : "Trạng thái không xác định"}
        </NTText>
      </View>
    </FTouchOpacity>
  );
}

export default NotifyItem;
