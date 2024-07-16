import Avatar from "@components/Avatar";
import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import React from "react";

function Header() {
  return (
    <Row
      full
      between
      style={{ alignItems: "center", paddingHorizontal: 10, height: 50 }}
    >
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
          <TextDefault bold style={{ fontSize: 20 }}>
            Hello, HuuTai👋
          </TextDefault>
          <TextDefault>Today, 27/03/24</TextDefault>
        </Row>

        <Avatar url="https://cdn.dribbble.com/users/6337227/screenshots/18205101/media/4badbb0030c79b3b85831c405bcdf309.png" />
      </Row>
    </Row>
  );
}

export default Header;
