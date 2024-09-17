import Avatar from "@components/Avatar";
import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import BellIcon from "assets/svg/bell-icon";
import SunIcon from "assets/svg/sun-icon";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styleGlobal } from "src/styles";

function Header() {
  const { theme } = useTheme();
  return (
    <Row full between style={{ alignItems: "center", height: 50 }}>
      <Row
        full
        between
        style={{ 
          alignItems: "center",
          paddingHorizontal: 10,
          height: 50,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Row direction="column" start rowGap={2}>
          <TouchableOpacity>
            <Row center>
              <SunIcon size={32} color={theme.primary} />
              <TextDefault
                bold
                style={{ fontSize: normalize(16), color: theme.primary }}
              >
                Good morning
              </TextDefault>
            </Row>
          </TouchableOpacity>
          <TextDefault>👋 HuuTai</TextDefault>
        </Row>
        <Row direction="row" end colGap={10}>
          <Avatar url="https://cdn.dribbble.com/users/6337227/screenshots/18205101/media/4badbb0030c79b3b85831c405bcdf309.png" />
          <View>
            <View style={styleGlobal.badge}>
              <TextDefault
                style={{ color: "white", fontSize: normalize(12) }}
                bold
              >
                2
              </TextDefault>
            </View>
            <BellIcon size={32} />
          </View>
        </Row>
      </Row>
    </Row>
  );
}

export default Header;
