import { FHeader, FView } from "@components/index";
import FText from "@components/texts/FText";
import React, { Component } from "react";

export default class PocilyScreen extends Component {
  render() {
    return (
      <FView>
        <FHeader type="back" />
        <FText txtStyle={{ textAlign: "center", marginTop: 200 }}>
          {"Đang phát triển!"}{" "}
        </FText>
      </FView>
    );
  }
}
