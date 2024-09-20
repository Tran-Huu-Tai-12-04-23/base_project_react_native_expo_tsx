import BackBtn from "@components/BackBtn";
import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";

function Header() {
  const { theme } = useTheme();
  return (
    <Row
      between
      style={{
        height: normalize(40),
        paddingHorizontal: normalize(10),
      }}
    >
      <BackBtn />
      <TextDefault bold style={{ fontSize: normalize(16) }}>
        Settings
      </TextDefault>
    </Row>
  );
}

export default Header;
