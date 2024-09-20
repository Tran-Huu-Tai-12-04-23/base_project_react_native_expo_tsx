import BackBtn from "@components/BackBtn";
import { IconButton } from "@components/Button";
import Row from "@components/Row";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { navigate } from "@navigation/NavigationService";
import { APP_ROUTE } from "@navigation/route";
import SettingIcon from "assets/svg/setting-icon";
import React from "react";

function Header() {
  const { theme } = useTheme();
  return (
    <Row
      between
      style={{
        alignItems: "center",
        position: "absolute",
        top: normalize(40),
        left: normalize(10),
        right: normalize(10),
        zIndex: 100000,
      }}
    >
      <BackBtn color={theme.background} />
      <IconButton
        icon={<SettingIcon />}
        onPress={() => navigate(APP_ROUTE.SETTING)}
      ></IconButton>
    </Row>
  );
}

export default Header;
