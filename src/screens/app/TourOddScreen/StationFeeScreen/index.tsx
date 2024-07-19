import { FHeader, FView } from "@components/index";
import React from "react";

type IProps = {};
const CreateFee = ({}: IProps) => {
  return (
    <FView>
      <FHeader type="menu" title="CreateFee" align="center" />
    </FView>
  );
};

export default CreateFee;
