import { FHeader, FView } from "@components/index";
import React from "react";

type IProps = {};
const step1GetCar = ({}: IProps) => {
  return (
    <FView>
      <FHeader type="menu" title="step1GetCar" align="center" />
    </FView>
  );
};

export default step1GetCar;
