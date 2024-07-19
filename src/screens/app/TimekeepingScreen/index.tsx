import { FHeader, FView } from "@components/index";
import React from "react";

type IProps = {};
const TimekeepingScreen = ({}: IProps) => {
  return (
    <FView>
      <FHeader type="menu" title="TimekeepingScreen" align="center" />
    </FView>
  );
};

export default TimekeepingScreen;
