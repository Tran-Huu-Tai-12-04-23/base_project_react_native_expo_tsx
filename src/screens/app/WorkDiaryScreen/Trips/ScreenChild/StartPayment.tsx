import { FHeader, FView } from "@components/index";
import React from "react";

type IProps = {};
const StartPayment = ({}: IProps) => {
  return (
    <FView>
      <FHeader type="menu" title="StartPayment" align="center" />
    </FView>
  );
};

export default StartPayment;
