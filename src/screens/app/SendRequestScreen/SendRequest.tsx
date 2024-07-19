import { FHeader, FView } from "@components/index";
import React from "react";

type IProps = {};
const SendRequest = ({}: IProps) => {
  return (
    <FView>
      <FHeader type="menu" title="SendRequest" align="center" />
    </FView>
  );
};

export default SendRequest;
